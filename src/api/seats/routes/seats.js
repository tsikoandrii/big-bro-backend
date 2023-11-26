module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/seats',
     handler: 'seats.getSeats',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'GET',
      path: '/appointment-info',
      handler: 'seats.getAppointmentInfo',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
