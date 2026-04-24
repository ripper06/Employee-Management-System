const express = require('express');
const router = express.Router();

const {EmployeeController} = require('../controller');

router.post('/', EmployeeController.createProfile)
router.get('/:id', EmployeeController.getProfile)

module.exports = router;