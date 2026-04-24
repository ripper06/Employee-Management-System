const express = require('express')

const router = express.Router();

const V1 = require('./v1')

router.use('/v1', V1);

module.exports = router;