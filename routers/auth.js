const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const secureLimit = rateLimit({
  windowMs: 1000,
  max: 4,
  standardHeaders: true,
  legacyHeaders: false,
});

const Login = require('../controllers/auth/login');
const Register = require('../controllers/auth/register');
const RefreshToken = require('../controllers/auth/refreshToken');
const { midlewareClient } = require('../middlewares/client');

router.use('/login', secureLimit, midlewareClient, Login);
router.use('/register', midlewareClient, Register);
router.use('/refresh-token', midlewareClient, RefreshToken);

module.exports = router;
