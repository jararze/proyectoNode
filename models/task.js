'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir la relación con el modelo User
      Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  // Inicializar el modelo Task con los atributos
  Task.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false, // No permite valores nulos
          validate: {
            notEmpty: true, // No permite cadenas vacías
          },
        },
        done: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false, // Valor predeterminado
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false, // No permite valores nulos
          references: {
            model: 'Users', // Nombre de la tabla de referencia
            key: 'id',
          },
          onDelete: 'CASCADE', // Elimina las tareas si se elimina el usuario
        },
      },
      {
        sequelize,
        modelName: 'Task',
        tableName: 'Tasks', // Nombre de la tabla en la base de datos
        timestamps: true, // Habilitar createdAt y updatedAt
      }
  );

  return Task;
};
