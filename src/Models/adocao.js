'use strict';
module.exports = (sequelize, DataTypes) => {
  const Adocao = sequelize.define('Adocao', {}, {});
  
  Adocao.associate = function(models) {
    Adocao.belongsTo(models.User, { as: 'tutor', foreignKey: 'tutorId' });
    Adocao.belongsTo(models.Pets, { as: 'pet', foreignKey: 'petId' });
  };
  
  return Adocao;
};
