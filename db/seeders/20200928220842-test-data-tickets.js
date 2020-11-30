'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tickets', [
      {name: 'profile button error', description: 'profile button directs user to the wrong page (login). Needs to be directed to profle. ', severityLevel: 'medium', status: 'work in progress', type: 'bug/error', projectId: 1, employeeId: 3, createdAt: new Date(), updatedAt: new Date() },
      {name: 'validation errors', description: 'validation errors not being displayed on login page ', severityLevel: 'high', status: 'completed', type: 'bug/error', projectId: 7, employeeId: 3, createdAt: new Date(), updatedAt: new Date() },
      {name: 'favicon', description: 'update the winter favicon', severityLevel: 'medium', status: 'completed', type: 'task', projectId: 5, employeeId: 5, createdAt: new Date(), updatedAt: new Date() },
      {name: 'update products', description: 'New products need added for winter season', severityLevel: 'high', status: 'work in progress', type: 'task', projectId: 5, employeeId: 5, createdAt: new Date(), updatedAt: new Date() },
      {name: 'candlestick colors', description: 'change color of candlestick data', severityLevel: 'high', status: 'work in progress', type: 'task', projectId: 3, employeeId: 3, createdAt: new Date(), updatedAt: new Date() },
      {name: 'update homepage background', description: 'update homepage background to winter deals', severityLevel: 'medium', status: 'work in progress', type: 'task', projectId: 2, employeeId: 6, createdAt: new Date(), updatedAt: new Date() },
      {name: 'homescreen bug', description: 'homescreen flashed upon logout', severityLevel: 'high', status: 'work in progress', type: 'bug/error', projectId: 4, employeeId: 7, createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tickets', null, {})
  }
};
