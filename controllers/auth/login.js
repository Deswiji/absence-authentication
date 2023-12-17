const express = require('express');
const db = require('../../models');
const {
  HttpSuccess,
  HttpUnprocessable,
  HttpinteralServerError,
  HttpInvalid,
} = require('../../HttpException');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { validateUser } = require('../../helpers/user');
const Token = require('./service/token');
const router = express.Router();

router.post(
  '/',
  [
    check('email').not().isEmpty().withMessage('email is required'),
    check('password').not().isEmpty().withMessage('password is required'),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return HttpUnprocessable(res, { errors: errors.array() });
    }
    try {
      const userExist = await validateUser(email);
      if (userExist) {
        if (!userExist.data.is_active) {
          return HttpInvalid(res, { message: 'Please activate your account.' });
        }

        const checkPassword = bcrypt.compareSync(
          password,
          userExist.data.password,
        );

        if (checkPassword) {
          const jwtToken = new Token();
          jwtToken.setToken(userExist.data);
          const token = jwtToken.signToken();
          const refreshToken = jwtToken.signRefreshToken(token);
          const data = {
            data: {
              email: userExist.data.email,
            },
            token,
            refreshToken,
          };
          return HttpSuccess(res, data);
        }
        return HttpInvalid(res, { message: 'Email or password incorrect.' });
      }
      return HttpInvalid(res, { message: 'Email or password incorrect.' });
    } catch (error) {
      console.log(error.message);
      return HttpinteralServerError(res, { message: 'Internal Server Error' });
    }
  },
);

module.exports = router;
