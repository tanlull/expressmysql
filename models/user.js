'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING(200),
    email: {
      type: DataTypes.STRING(100),
      unique:true,
      allowNull: false
    },
    password: DataTypes.STRING(100),
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'User', 
    tableName: 'users',
    timestamps: false
  });

  User.associate = function(models) {
    models.User.hasMany(models.Blog,{
      as: 'blogs',
      foreignKey:'user_id', //fk's blog table
      sourceKey: 'id' //pk's user table
    })
  }

  return User;
};