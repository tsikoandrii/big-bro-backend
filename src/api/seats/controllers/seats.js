'use strict';

/**
 * A set of functions called "actions" for `busy-days`
 */

module.exports = {
  async getSeats(ctx, next) {
    try {
      const data = await strapi
        .service("api::seats.seats")
        .getSeats(ctx.request.query.date, ctx.request.query.master);

      ctx.body = data;
    } catch (err) {
      console.log(err)
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
  async getAppointmentInfo(ctx, next) {
    try {
      const data = await strapi
        .service("api::seats.seats")
        .getAppointmentInfo(ctx.request.query.service, ctx.request.query.master);

      ctx.body = data;
    } catch (err) {
      console.log(err)
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
