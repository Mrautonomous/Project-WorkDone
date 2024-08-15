const express = require('express');
const router = express.Router();

const { verifyOTP } = require('../controller/verifyOTP');

router.post('/verifyotp', verifyOTP);

module.exports = router;
