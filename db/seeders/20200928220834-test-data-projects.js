'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', [
      {name: 'bug Tracker', description: 'app that tracks issues to be delegated to devs in scrum sprints' , createdAt: new Date(), updatedAt: new Date()},
      {name: 'Cadabra', description: 'Amazon inspired clone' , createdAt: new Date(), updatedAt: new Date()},
      {name: 'BlueJay', description: 'Robinhood inspired crypto currency web app' , createdAt: new Date(), updatedAt: new Date()},
      {name: 'BadReads', description: 'GoodReads clone that tracks books you\'re reading' , createdAt: new Date(), updatedAt: new Date()},
      {name: 'Amazon', description: 'E-commerce website' , createdAt: new Date(), updatedAt: new Date()},
      {name: 'Trackerfy', description: 'Scrum inspired bug tracker' , createdAt: new Date(), updatedAt: new Date()},
      {name: 'bug Tracker 2.0', description: 'new version of bug tracker app' , createdAt: new Date(), updatedAt: new Date()},
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {})
  }
};
