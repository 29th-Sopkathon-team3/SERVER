const express = require('express');
const router = express.Router();

router.post('/', require('./rankPOST')); // 랭킹 공동체 생성
router.get('/:code', require('./rankGET')); // 공동체 랭킹 조회
router.put('/:code', require('./rankEnterPUT')); // 유저 입장
router.put('/:code/:userId', require('./rankPUT')); // 유저 랭킹 업데이트

module.exports = router;
