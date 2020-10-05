const bcrypt = require('bcryptjs')
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
      type: DataTypes.INTEGER
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    }
  }, {});
  Employee.associate = function(models) {
    const columnMapping = {
      through: "EmployeeProject",
      foreignKey: "employeeId",
      otherKey: "projectId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }

    Employee.belongsToMany(models.Project, columnMapping),
    Employee.belongsTo(models.Role, {foreignKey: "roleId", onDelete: "CASCADE"})
    Employee.hasMany(models.Ticket, {foreignKey: "employeeId", onDelete: "CASCADE"})
  };

  Employee.prototype.validatePassword = function (password) {
    // because this is a model instance method, `this` is the user instance here:
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  return Employee;
};