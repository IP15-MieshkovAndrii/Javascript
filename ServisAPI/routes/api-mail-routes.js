const express = require('express');

const { 
    getMail, 
    getMails,
    addMail } = require('../controllers/api-mail-controller')

const router = express.Router();

router.get('/api/mails/:id', getMail);
router.get('/api/mails', getMails);
router.post('/api/subscription', addMail);

module.exports = router;