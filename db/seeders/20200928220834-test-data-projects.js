'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Projects', [
      {name: 'bug Tracker', description: 'app that tracks issues to be delegated to devs in scrum sprints' , comments: ['1__this may take some time', '3__should be done by the end of the day' ], createdAt: new Date(), updatedAt: new Date()}
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {})
  }
};
