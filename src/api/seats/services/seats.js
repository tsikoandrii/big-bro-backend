module.exports = {
  getSeats: async (day, masterId) => {
    try {
      // fetching data
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

      const busy = master.busy?.[day];

      let morningTimes = master.morning;
      let dayTimes = master.day;
      let eveningTimes = master.evening;

      console.log(day)

      if (busy) {
        morningTimes = master.morning.filter((time) => !busy.includes(time.id))
        dayTimes = master.day.filter((time) => !busy.includes(time.id))
        eveningTimes = master.evening.filter((time) => !busy.includes(time.id))
      }

      return {
        morning: morningTimes,
        day: dayTimes,
        evening: eveningTimes
      };
    } catch (err) {
      console.log(err)
      return err;
    }
  },
  getAppointmentInfo: async (serviceId, masterId) => {
    try {
      // fetching data
      const master = await strapi.entityService.findOne(
        "api::master.master",
        masterId,
        {
          fields: ["name"],
          populate: {
            avatar: {
              fields: ["url"]
            }
          }
        }
      );

      const service = await strapi.entityService.findOne(
        "api::price.price",
        serviceId,
        {
          fields: ["amount"],
          populate: {
            service: {
              fields: ["title"],
            }
          }
        }
      );

      return {
        name: master.name,
        avatar: master.avatar.url,
        price: service.amount,
        serviceName: service.service.title
      };
    } catch (err) {
      console.log(err)
      return err;
    }
  },
};
