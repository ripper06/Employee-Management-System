const express = require('express');
const router = express.Router();

const {EmployeeController} = require('../../controller');

router.post('/', EmployeeController.createProfile);

router.get('/isRegistered', EmployeeController.checkIsRegistered);

router.get('/',EmployeeController.getEmployeesByDepartment);
router.get('/', EmployeeController.getAllEmployee);
router.get('/:id', EmployeeController.getProfile);

router.put('/:id', EmployeeController.updateEmployee);




module.exports = router;