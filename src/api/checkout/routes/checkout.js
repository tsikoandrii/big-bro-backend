module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/create-checkout',
      handler: 'checkout.createCheckout',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/delete-checkout',
      handler: 'checkout.deleteCheckout',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
