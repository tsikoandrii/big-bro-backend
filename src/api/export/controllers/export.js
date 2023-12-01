'use strict';

/**
 * A set of functions called "actions" for `export`
 */

module.exports = {
  async exportCustomers(ctx, next) {
    try {
      const data = await strapi
        .service("api::export.export")
        .exportCustomers(ctx.request.query.master);

      ctx.body = data;
    } catch (err) {
      console.log(err)
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
  async exportAppointments(ctx, next) {
    try {
      const data = await strapi
        .service("api::export.export")
        .exportAppointments(ctx.request.query.master);

      ctx.body = data;
    } catch (err) {
      console.log(err)
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
