module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/export-customers',
     handler: 'export.exportCustomers',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'GET',
      path: '/export-appointments',
      handler: 'export.exportAppointments',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
