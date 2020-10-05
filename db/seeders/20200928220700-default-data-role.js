'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {name: 'admin', createdAt: new Date(), updatedAt: new Date()},
      {name: 'projectManager', createdAt: new Date(), updatedAt: new Date()},
      {name: 'dev', createdAt: new Date(), updatedAt: new Date()},
      {name: 'submitter', createdAt: new Date(), updatedAt: new Date()}
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {})
  }
};
