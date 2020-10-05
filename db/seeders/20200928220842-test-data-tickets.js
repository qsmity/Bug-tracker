'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tickets', [
      {name: 'profile button error', description: 'profile button directs user to the wrong page (login). Needs to be directed to profle. ', severityLevel: 'medium', status: 'work in progess', type: 'bug/error', projectId: 1, employeeId: 3, createdAt: new Date(), updatedAt: new Date() },
      {name: 'validation errors', description: 'validation errors not being displayed on login page ', severityLevel: 'high', status: 'completed', type: 'bug/error', projectId: 1, employeeId: 3, createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tickets', null, {})
  }
};
