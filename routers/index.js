const express = require('express');
const router = express.Router();

const { midlewareClient } = require('../middlewares/client');
const midlewareAuth = require('../middlewares/auth');

const Absence = require('../controllers/Absence/indexController');

router.use('/absence', midlewareClient, midlewareAuth, Absence);

module.exports = router;
