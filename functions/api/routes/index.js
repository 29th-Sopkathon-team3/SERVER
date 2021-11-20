const express = require('express');
const router = express.Router();

router.use('/rank', require('./rank'));

module.exports = router;
