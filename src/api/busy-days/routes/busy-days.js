module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/busy-days',
     handler: 'busy-days.getBusyDays',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
