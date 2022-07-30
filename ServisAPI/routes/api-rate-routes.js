const express = require('express');
const getRate = require('../controllers/api-rate-controller')

const router = express.Router();

router.get('/api/rate', getRate);

module.exports = router;