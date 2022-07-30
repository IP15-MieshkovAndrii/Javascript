const express = require('express');

const { 
    addMail } = require('../controllers/api-mail-controller')

const router = express.Router();

router.post('/api/subscription', addMail);

module.exports = router;