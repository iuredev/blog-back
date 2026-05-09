import { factories } from '@strapi/strapi';

const REACTION_TYPES = ['like', 'dislike', 'love', 'fire', 'mindblown', 'sad'];

export default factories.createCoreController('api::reaction.reaction', ({ strapi }) => ({
  async toggle(ctx) {
    const { articleDocumentId, type, visitorId } = ctx.request.body as { articleDocumentId: string; type: string; visitorId: string };

    if (!articleDocumentId || !type || !visitorId) {
      return ctx.badRequest('articleDocumentId, type and visitorId are required');
    }
    if (!REACTION_TYPES.includes(type)) {
      return ctx.badRequest(`type must be one of: ${REACTION_TYPES.join(', ')}`);
    }

    const ipHash = visitorId;

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
    const { visitorId } = ctx.query as { visitorId?: string };

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

    const ipHash = visitorId || null;
    const userReactions = ipHash
      ? reactions.filter((r: any) => r.ipHash === ipHash).map((r: any) => r.type)
      : [];

    ctx.body = { counts, userReactions };
  },
}));
