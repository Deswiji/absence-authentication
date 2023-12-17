const moment = require('moment');
const { DataTypes } = require('sequelize');
const db = require('../config/DB');

const attribute = {
  absence_id: {
    type: DataTypes.INTEGER,
  },
  clock_in: {
    type: DataTypes.DATE,
  },
  clock_out: {
    type: DataTypes.DATE,
  },
};

const tb_absence_times = db.define('tb_absence_times', attribute, {
  timestamps: false,
  freezeTableName: true,
});

module.exports = tb_absence_times;
