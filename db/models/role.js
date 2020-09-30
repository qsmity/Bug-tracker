'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Role.associate = function(models) {
    Role.hasMany(models.Employee, {foreignKey: "roleId", onDelete: "CASCADE"})
  };
  return Role;
};