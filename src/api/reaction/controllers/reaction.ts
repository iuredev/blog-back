import { factories } from '@strapi/strapi';
import crypto from 'crypto';

const REACTION_TYPES = ['like', 'dislike', 'love', 'fire', 'mindblown', 'sad'];

function getIpHash(ctx: any): string {
  const ip =
    (ctx.request.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    (ctx.request.headers['x-real-ip'] as string)?.trim() ||
    ctx.request.ip ||
    'unknown';
  const salt = process.env.IP_HASH_SALT || 'blog-reactions-salt';
  return crypto.createHash('sha256').update(ip + salt).digest('hex');
}

export default factories.createCoreController('api::reaction.reaction', ({ strapi }) => ({
  async toggle(ctx) {
    const { articleDocumentId, type } = ctx.request.body as { articleDocumentId: string; type: string };

    if (!articleDocumentId || !type) {
      return ctx.badRequest('articleDocumentId and type are required');
    }
    if (!REACTION_TYPES.includes(type)) {
      return ctx.badRequest(`type must be one of: ${REACTION_TYPES.join(', ')}`);
    }

    const ipHash = getIpHash(ctx);

    const existing = await strapi.db.query('api::reaction.reaction').findMany({
      where: { articleDocumentId, type, ipHash },
      limit: 1,
    });

    if (existing.length > 0) {
      await strapi.db.query('api::reaction.reaction').delete({
        where: { id: existing[0].id },
      });
      ctx.body = { action: 'removed', type };
    } else {
      await strapi.db.query('api::reaction.reaction').create({
        data: { articleDocumentId, type, ipHash },
      });
      ctx.body = { action: 'added', type };
    }
  },

  async counts(ctx) {
    const { articleDocumentId } = ctx.params as { articleDocumentId: string };

    if (!articleDocumentId) return ctx.badRequest('articleDocumentId is required');

    const reactions = await strapi.db.query('api::reaction.reaction').findMany({
      where: { articleDocumentId },
      limit: 100000,
    });

    const counts: Record<string, number> = {};
    REACTION_TYPES.forEach((t) => (counts[t] = 0));
    reactions.forEach((r: any) => {
      counts[r.type] = (counts[r.type] || 0) + 1;
    });

    const ipHash = getIpHash(ctx);
    const debugIp = (ctx.request.headers['x-forwarded-for'] as string) || (ctx.request.headers['x-real-ip'] as string) || ctx.request.ip;
    strapi.log.info(`[reactions] ip=${debugIp} hash=${ipHash.substring(0, 8)}...`);
    const userReactions = reactions.filter((r: any) => r.ipHash === ipHash).map((r: any) => r.type);

    ctx.body = { counts, userReactions };
  },
}));
