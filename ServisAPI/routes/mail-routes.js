const express = require('express');

const { 
    getAddMail,
    addMail } = require('../controllers/mail-controller')

const router = express.Router();

router.get('/subscription', getAddMail);
router.post('/subscription', addMail);

module.exports = router;