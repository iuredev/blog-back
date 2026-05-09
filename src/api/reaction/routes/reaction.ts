export default {
  routes: [
    {
      method: 'POST',
      path: '/reactions/toggle',
      handler: 'reaction.toggle',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/reactions/counts/:articleDocumentId',
      handler: 'reaction.counts',
      config: { auth: false },
    },
  ],
};
