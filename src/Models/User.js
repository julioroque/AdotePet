'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  
  User.associate = function(models) {
    User.hasMany(models.Pets, { as: 'adoptedPets', foreignKey: 'tutorId' });
  };
  
  return User;
};
