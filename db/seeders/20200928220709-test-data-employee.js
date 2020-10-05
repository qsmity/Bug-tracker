'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Employees', [
      {name: 'demo_user_admin', email: 'demo1@example.com', roleId: 1, hashedPassword: bcrypt.hashSync('password1'), createdAt: new Date(), updatedAt: new Date()},
      {name: 'demo_user_projectManager', email: 'demo2@example.com', roleId: 2, hashedPassword: bcrypt.hashSync('password2'), createdAt: new Date(), updatedAt: new Date()},
      {name: 'demo_user_dev', email: 'demo3@example.com', roleId: 3, hashedPassword: bcrypt.hashSync('password3'), createdAt: new Date(), updatedAt: new Date()},
      {name: 'demo_user_submitter', email: 'demo4@example.com', roleId: 4, hashedPassword: bcrypt.hashSync('password4'), createdAt: new Date(), updatedAt: new Date()},
      {name: 'tom', email: 'tom@example.com', roleId: 2, hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date()},
      {name: 'bob', email: 'bob@example.com', roleId: 3, hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date()},
      {name: 'jess', email: 'jess@example.com', roleId: null, hashedPassword: bcrypt.hashSync('password'), createdAt: new Date(), updatedAt: new Date()}
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Employees', null, {})
  }
};
