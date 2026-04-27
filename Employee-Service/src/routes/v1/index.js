const express = require('express');
const router = express.Router();

const employeeRoutes = require('./employeeRoutes');

router.use('/employees', employeeRoutes);


module.exports = router;