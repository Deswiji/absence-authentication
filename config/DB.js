const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DATABASE, 'root', process.env.PASSWORD, {
  host: process.env.HOST,
  port: 3306,
  dialect: 'mysql',
  logging: true,
});

module.exports = db;
