const fs =  require('fs')
const json2xls =  require('json2xls')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

module.exports = {
  exportCustomers: async () => {
    try {
      // fetching data
      const customers = await strapi.entityService.findMany(
        "api::customer.customer",
        {
          fields: ["name", "phone"]
        }
      );

      const xls = json2xls(customers);

      const url = `uploads/data-exports/customers.xlsx`

      fs.writeFileSync(process.cwd() + '/public/' + url, xls, 'binary');

      return url;
    } catch (err) {
      console.log(err)
      return err;
    }
  },
  exportAppointments: async () => {
    try {
      // fetching data
      const appointments = await strapi.entityService.findMany(
        "api::appointment.appointment",
        {
          fields: ["date", "time"],
          populate: {
            customer: {},
            service: {
              populate: {
                master: {
                  fields: ['name']
                },
                service: {
                  fields: ['title']
                }
              }
            }
          }
        }
      );

      const json = appointments.map(appointment => {
        return {
          'Дата': appointment.date,
          'Час': appointment.time,
          'Клієнт': appointment.customer.name,
          'Послуга': appointment.service.service.title,
          'Майстер': appointment.service.master.name,
          'Ціна': appointment.service.amount,
        }
      })

      const xls = json2xls(json);

      const url = `uploads/data-exports/appointments.xlsx`

      fs.writeFileSync(process.cwd() + '/public/' + url, xls, 'binary');

      return url;
    } catch (err) {
      console.log(err)
      return err;
    }
  },
};
