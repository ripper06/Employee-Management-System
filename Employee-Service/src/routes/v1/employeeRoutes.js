const express = require('express');
const router = express.Router();

const { EmployeeController, AtendanceController } = require('../../controller');

// Employee Routes
router.post('/', EmployeeController.createProfile);

router.get('/isRegistered', EmployeeController.checkIsRegistered);

// Better separation
router.get('/', EmployeeController.getEmployeesByDepartment);
router.get('/', EmployeeController.getAllEmployee);

router.get('/:id', EmployeeController.getProfile);
router.put('/:id', EmployeeController.updateEmployee);


// Attendance Routes (grouped logically)
router.post('/check-in/:id', AtendanceController.checkIn);
router.post('/check-out/:id', AtendanceController.checkOut);
router.get('/attendance/monthly', AtendanceController.getMonthlyReport);
router.get('/attendance/:emp_id', AtendanceController.getAllAttendanceByEmployeeId);

module.exports = router;