'use strict';

const employeeproject = require("./employeeproject");

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
      unique: true
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(200)
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  }, {});
  Project.associate = function(models) {
    const columnMapping = {
      through: "EmployeeProject",
      foreignKey: "projectId",
      // as: "project",
      otherKey: "employeeId",
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
    Project.belongsToMany(models.Employee, columnMapping)
    Project.hasMany(models.Ticket, {foreignKey: "projectId", onDelete: "CASCADE"})
  };
  return Project;
};