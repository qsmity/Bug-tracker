'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EmployeeProjects', [
      {employeeId: 3, projectId: 1, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 2, projectId: 1, createdAt: new Date(), updatedAt: new Date()}
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EmployeeProjects', null, {})
  }
};
