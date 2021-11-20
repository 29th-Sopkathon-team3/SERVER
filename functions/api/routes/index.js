const express = require('express');
const router = express.Router();

router.use('/rank', require('./rank'));
router.use('/user', require('./user'));

module.exports = router;
