const moment = require('moment');
const { DataTypes } = require('sequelize');
const db = require('../config/DB');

const attribute = {
  user_id: {
    type: DataTypes.INTEGER,
  },
  ip_address: {
    type: DataTypes.STRING,
  },
  longitude: {
    type: DataTypes.FLOAT,
  },
  latitude: {
    type: DataTypes.FLOAT,
  },
  created: {
    type: DataTypes.DATE,
    defaultValue: moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  modified: {
    type: DataTypes.DATE,
  },
};

const tb_absences = db.define('tb_absences', attribute, {
  timestamps: false,
  freezeTableName: true,
});

module.exports = tb_absences;
