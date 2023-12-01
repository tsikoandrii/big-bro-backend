module.exports = {
  createAppointment: async (name, phone, priceId, date, time, masterId) => {
    try {
      let customers = await strapi.entityService.findMany('api::customer.customer', {
        filters: {
          phone: phone
        }
      });

      let customer;

      // Create new Customer
      if (!customers.length) {
        customer = await strapi.entityService.create('api::customer.customer', {
          data: {
            name: name,
            phone: phone
          },
        });
      } else {
        customer = customers[0]
      }

      time = JSON.parse(time);

      // Create new Appointment
      const appointment = await strapi.entityService.create('api::appointment.appointment', {
        data: {
          service: priceId,
          customer: customer.id,
          date,
          timeId: time.id,
          time: time.Hour,
        },
      });

      let { busy } = await strapi.entityService.findOne('api::master.master', masterId);

      // Add time to busy;
      if (busy[date]) {
        busy[date] = [...busy[date], Number(time.id)];
      } else {
        busy[date] = [Number(time.id)];
      }


      await strapi.entityService.update('api::master.master', masterId, {
        data: {
          busy
        }
      })

      return appointment;
    } catch (err) {
      console.log(err)
      return err;
    }
  },
  deleteAppointment: async (id) => {
    try {
      // Find a appointment
      const appointment = await strapi.entityService.findOne('api::appointment.appointment', id, {
        populate: {
          service: {
            populate: {
              master: '*'
            }
          }
        }
      });

      let master = appointment?.service?.master;

      if (master) {
        let busy = master?.busy;
        let date = appointment?.date;
        let timeId = appointment?.timeId;

        // Add time to busy;
        if (busy) {
          if (busy[date]) {
            busy[date] = busy[date].filter(time => time !== Number(timeId))
          }
        }

        await strapi.entityService.update('api::master.master', master?.id, {
          data: {
            busy
          }
        })
      }

      const response = await strapi.entityService.delete('api::appointment.appointment', id)

      return response;
    } catch (err) {
      console.log(err)
      return err;
    }
  },
  deletePricesByMaster: async (id) => {
    try {
      // Find a appointment
      const prices =  await strapi.entityService.findMany('api::price.price', {
        filters: {
          master: id
        }
      })

      const ids = prices.map(price => price.id)

      await Promise.all(
        ids.map((id) =>
          strapi.db.query("api::price.price").delete({
            where: { id },
          })
        )
      );

      return prices;
    } catch (err) {
      console.log(err)
      return err;
    }
  },
  deletePricesByService: async (id) => {
    try {
      // Find a appointment
      const prices =  await strapi.entityService.findMany('api::price.price', {
        filters: {
          service: id
        }
      })

      const ids = prices.map(price => price.id)

      await Promise.all(
        ids.map((id) =>
          strapi.db.query("api::price.price").delete({
            where: { id },
          })
        )
      );

      return prices;
    } catch (err) {
      console.log(err)
      return err;
    }
  }
};
