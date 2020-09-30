'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmployeeProject = sequelize.define('EmployeeProject', {
    employeeId: {
      allowNull: false, 
      type: DataTypes.INTEGER
    },
    projectId: {
      allowNull: false, 
      type: DataTypes.INTEGER
    }
  }, {});
  EmployeeProject.associate = function(models) {
    // associations can be defined here
  };
  return EmployeeProject;
};