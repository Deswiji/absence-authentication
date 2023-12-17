const moment = require('moment');
const { DataTypes } = require('sequelize');
const db = require('../config/DB');

const attribute = {
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  created: {
    type: DataTypes.DATE,
    defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  modified: {
    type: DataTypes.DATE,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
  },
};

const tb_users = db.define('tb_users', attribute, {
  timestamps: false,
  freezeTableName: true,
});

module.exports = tb_users;
