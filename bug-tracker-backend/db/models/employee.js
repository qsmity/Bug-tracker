'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(100),
      unique: true
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    }
  }, {});
  Employee.associate = function(models) {
    const columnMapping = {
      through: Employeeproject,
      foreignKey: employeeId,
      // as: "employee",
      otherKey: projectId,
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }

    Employee.hasMany(models.Project, columnMapping),
    Employee.belongTo(models.Role, {foreignKey: "roleId", onDelete: "CASCADE"})
    Employee.hasMany(models.Ticket, {foreignKey: "employeeId", onDelete: "CASCADE"})
  };
  return Employee;
};