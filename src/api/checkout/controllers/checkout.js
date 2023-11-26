'use strict';

/**
 * A set of functions called "actions" for `checkout`
 */

module.exports = {
  async createCheckout(ctx, next) {
    try {

      const { name, phone, priceId, date, time, masterId } = ctx.request.body

      const data = await strapi
        .service("api::checkout.checkout")
        .createAppointment(name, phone, priceId, date, time, masterId);

      ctx.body = data;
    } catch (err) {
      console.log(err)
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
  async deleteCheckout(ctx, next) {
    try {

      const { id } = ctx.request.query

      const data = await strapi
        .service("api::checkout.checkout")
        .deleteAppointment(id);

      ctx.body = data;
    } catch (err) {
      console.log(err)
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
