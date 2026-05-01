const express = require('express');
const router = express.Router();

const leave = require('./leaveRoutes');

router.use('/leaves', leave);

module.exports = router;