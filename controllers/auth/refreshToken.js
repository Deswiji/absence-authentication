const express = require('express');
const { check, validationResult } = require('express-validator');
const {
  HttpSuccess,
  HttpNotFound,
  HttpBadRequest,
  HttpUnprocessable,
  HttpinteralServerError,
} = require('../../HttpException');
const db = require('../../models');
const Token = require('./service/token');
const router = express.Router();

router.post(
  '/',
  [check('refresh_token').notEmpty().isString().withMessage('required')],
  async (req, res) => {
    const { refresh_token } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return HttpUnprocessable(res, { errors: errors.array() });
    }

    try {
      const token = new Token();
      const isValidRefreshToken = token.verifyRefreshToken(refresh_token);
      if (isValidRefreshToken) {
        const dataUser = await db.tb_users.findOne({
          where: {
            id: isValidRefreshToken.userID,
          },
        });
        if (dataUser) {
          token.setToken(dataUser);
          const newToken = token.signToken();
          const newRefreshToken = token.signRefreshToken(newToken);
          const data = {
            token: newToken,
            refreshToken: newRefreshToken,
          };
          return HttpSuccess(res, data);
        }
        return HttpNotFound(res, {
          message: 'Token not found',
          data: isValidRefreshToken,
        });
      }
      return HttpBadRequest(res);
    } catch (error) {
      console.log(error);
      return HttpinteralServerError(res, {
        message: 'Internal Server Error',
      });
    }
  },
);

module.exports = router;
