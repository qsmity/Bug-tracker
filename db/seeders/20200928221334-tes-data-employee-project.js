'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EmployeeProjects', [
      {employeeId: 2, projectId: 1, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 2, projectId: 2, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 2, projectId: 3, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 2, projectId: 4, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 2, projectId: 5, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 2, projectId: 6, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 2, projectId: 7, createdAt: new Date(), updatedAt: new Date()},

      {employeeId: 3, projectId: 1, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 3, projectId: 2, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 3, projectId: 3, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 3, projectId: 4, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 3, projectId: 5, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 3, projectId: 6, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 3, projectId: 7, createdAt: new Date(), updatedAt: new Date()},


      {employeeId: 4, projectId: 1, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 4, projectId: 2, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 4, projectId: 3, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 4, projectId: 4, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 4, projectId: 5, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 4, projectId: 6, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 4, projectId: 7, createdAt: new Date(), updatedAt: new Date()},

      {employeeId: 5, projectId: 1, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 5, projectId: 2, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 5, projectId: 3, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 5, projectId: 4, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 5, projectId: 5, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 5, projectId: 6, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 5, projectId: 7, createdAt: new Date(), updatedAt: new Date()},

      {employeeId: 6, projectId: 1, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 6, projectId: 2, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 6, projectId: 3, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 6, projectId: 4, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 6, projectId: 5, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 6, projectId: 6, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 6, projectId: 7, createdAt: new Date(), updatedAt: new Date()},

      {employeeId: 7, projectId: 1, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 7, projectId: 2, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 7, projectId: 3, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 7, projectId: 4, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 7, projectId: 5, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 7, projectId: 6, createdAt: new Date(), updatedAt: new Date()},
      {employeeId: 7, projectId: 7, createdAt: new Date(), updatedAt: new Date()},
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EmployeeProjects', null, {})
  }
};
