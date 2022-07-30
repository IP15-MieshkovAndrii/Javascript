const express = require('express');
const getRate = require('../controllers/rate-controller')

const router = express.Router();

router.get('/rate', getRate);

module.exports = router;