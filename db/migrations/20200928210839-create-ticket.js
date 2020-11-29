'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false, 
        type: Sequelize.STRING(100)
      },
      description: {
        allowNull: false, 
        type: Sequelize.STRING(200)
      },
      severityLevel: {
        allowNull: false, 
        type: Sequelize.STRING(20)
      },
      status: {
        allowNull: false, 
        type: Sequelize.STRING(20)
      },
      type: {
        allowNull: false, 
        type: Sequelize.STRING(50)
      },
      projectId: {
        allowNull: false, 
        type: Sequelize.INTEGER,
        references: {model: "Projects"},
        onDelete: 'CASCADE'
      },
      employeeId: {
        allowNull: true, 
        type: Sequelize.INTEGER,
        references: {model: "Employees"},
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tickets');
  }
};