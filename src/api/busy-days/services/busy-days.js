module.exports = {
  getWeekends: async (masterId) => {
    try {
      // fetching data
      const weekends = await strapi.entityService.findMany(
        "api::weekend.weekend",
        {
          fields: ["id", "title", "date"]
        }
      );

      const weekendsDates = weekends.map(weekend => weekend.date);

      const master = await strapi.entityService.findOne(
        "api::master.master",
        masterId,
        {
          fields: ["name", "busy"],
          populate: {
            morning: {},
            day: {},
            evening: {}
          }
        }
      );

      const busy = master.busy;

      const ids = [
        ...master.morning.map(hour => hour.id),
        ...master.day.map(hour => hour.id),
        ...master.evening.map(hour => hour.id)
      ];

      const busyDays = Object.keys(busy).map((date) => {
        if (ids.every(r => busy[date].includes(r))) return date
      })

      return [...busyDays, ...weekendsDates];
    } catch (err) {
      console.log(err)
      return err;
    }
  },
};
