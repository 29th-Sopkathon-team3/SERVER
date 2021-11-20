const express = require('express');
const router = express.Router();

router.post('/', require('./rankPOST')); // 랭킹 공동체 생성
router.get('/:code', require('./rankGET')); // 공동체 랭킹 조회
router.put('/', require('./rankPUT')); // 유저 랭킹 업데이트

module.exports = router;
