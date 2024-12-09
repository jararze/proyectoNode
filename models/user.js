'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir la relación con el modelo Task
      User.hasMany(models.Task, { foreignKey: 'userId' });
    }
  }

  // Inicializar el modelo User con los atributos
  User.init(
      {
        username: {
          type: DataTypes.STRING,
          allowNull: false, // No permite valores nulos
          unique: true, // Username debe ser único
          validate: {
            notEmpty: true, // No permite cadenas vacías
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'active', // Valor predeterminado
          validate: {
            isIn: [['active', 'inactive']], // Validar valores permitidos
          },
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'Users', // Nombre de la tabla en la base de datos
        timestamps: true, // Habilitar createdAt y updatedAt
      }
  );

  return User;
};
