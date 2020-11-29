'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(200)
    },
    severityLevel: {
      allowNull: false,
      type: DataTypes.STRING(20)
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING(20)
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    projectId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    employeeId: {
      allowNull: true,
      type: DataTypes.INTEGER
    }
  }, {});
  Ticket.associate = function(models) {
    Ticket.belongsTo(models.Employee, {foreignKey: "employeeId", onDelete: "CASCADE"})
    Ticket.belongsTo(models.Project, {foreignKey: "projectId", onDelete: "CASCADE"})
  };
  return Ticket;
};