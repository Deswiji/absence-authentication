const express = require('express');
const {
  HttpUnprocessable,
  HttpinteralServerError,
  HttpInvalid,
  HttpSuccessCreate,
} = require('../../HttpException');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { validateUser } = require('../../helpers/user');
const tb_users = require('../../models/tb_users');
const router = express.Router();

router.post(
  '/',
  [
    check('email').not().isEmpty().withMessage('email is required'),
    check('password').not().isEmpty().withMessage('password is required'),
    check('password').isLength({ min: 8 }).withMessage('min. 8 character'),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return HttpUnprocessable(res, { errors: errors.array() });
    }

    try {
      const validateUserExist = await validateUser(email);
      if (validateUserExist) {
        return HttpInvalid(res, validateUserExist?.message);
      }

      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      const newUser = await tb_users.create({
        email,
        password: passwordHash,
      });
      return HttpSuccessCreate(res);
    } catch (error) {
      console.log(error);
      return HttpinteralServerError(res, { message: 'Internal Server Error' });
    }
  },
);

module.exports = router;
