'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pets = sequelize.define('Pets', {
    animal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    raca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adotado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  
  Pets.associate = function(models) {
    Pets.belongsTo(models.User, { as: 'tutor', foreignKey: 'tutorId' });
  };
  
  return Pets;
};
