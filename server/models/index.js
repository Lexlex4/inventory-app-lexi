const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Sauce = sequelize.define("Sauce", {
  name: Sequelize.TEXT,
  description: Sequelize.TEXT,
  price: Sequelize.REAL,
  category: Sequelize.TEXT,
  image: Sequelize.TEXT,
});

module.exports = {
  db: sequelize,
  Sauce,
};
