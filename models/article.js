'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article extends Model {}
  article.init({
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    type: DataTypes.STRING,
    storageCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'article',
  });
  return article;
};