'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tickets', [
      {name: 'profile button error', description: 'profile button directs user to the wrong page (login). Needs to be directed to profle. ', severityLevel: 'medium', status: 'work in progess', type: 'bug/error', projectId: 1, employeeId: 3, createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ticket', null, {})
  }
};
