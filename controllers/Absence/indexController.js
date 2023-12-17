const express = require('express');
const {
  HttpinteralServerError,
  HttpSuccessCreate,
  HttpSuccess,
} = require('../../HttpException');
const tb_absences = require('../../models/tb_absences');
const tb_absence_times = require('../../models/tb_absence_times');
const { Op, Sequelize } = require('sequelize');
const moment = require('moment');
const ip = require('ip');
const db = require('../../config/DB');
const { getDataCoordinate } = require('../../helpers/getCoordinate');
const router = express.Router();

router.post('/', async (req, res) => {
  const transaction = await db.transaction();
  try {
    const checkAbsenceData = await tb_absences.findOne({
      where: {
        user_id: {
          [Op.eq]: req?.auth?.id,
        },
        [Op.and]: [
          Sequelize.literal(
            `DATE_FORMAT(created, '%Y-%m-%d') = '${moment().format(
              'YYYY-MM-DD',
            )}'`,
          ),
        ],
      },
    });
    if (!checkAbsenceData) {
      // insert data
      const dataPrivate = await getDataCoordinate();
      const insertData = await tb_absences.create(
        {
          user_id: req?.auth?.id,
          ip_address: dataPrivate?.ip,
          longitude: dataPrivate?.longitude,
          latitude: dataPrivate?.latitude,
        },
        {
          transaction,
        },
      );

      const insertDataAbsenceTime = await tb_absence_times.create(
        {
          absence_id: insertData?.id,
          clock_in: new Date(),
          clock_out: null,
        },
        { transaction },
      );
      await transaction.commit();
      return HttpSuccessCreate(res, 'Successfully Check In');
    }

    // update data
    await tb_absences.update(
      {
        modified: new Date(),
      },
      {
        where: {
          id: {
            [Op.eq]: checkAbsenceData?.id,
          },
        },
        transaction,
      },
    );
    await tb_absence_times.update(
      {
        clock_out: new Date(),
      },
      {
        where: {
          absence_id: {
            [Op.eq]: checkAbsenceData?.id,
          },
        },
        transaction,
      },
    );
    await transaction.commit();
    return HttpSuccess(res, 'Successfully Check Out');
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return HttpinteralServerError(res);
  }
});

module.exports = router;
