'use strict';

/**
 * A set of functions called "actions" for `busy-days`
 */

module.exports = {
  async getBusyDays(ctx, next) {
    try {
      const data = await strapi
        .service("api::busy-days.busy-days")
        .getWeekends(ctx.request.query.master);

      ctx.body = data;
    } catch (err) {
      console.log(err)
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
