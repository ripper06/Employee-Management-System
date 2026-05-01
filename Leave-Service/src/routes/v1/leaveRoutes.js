const express = require('express');
const router = express.Router();

const {LeaveController} = require('../../controller')
const {LeaveUpdateAuthorization} = require('../../middlewares/authorizationMiddleware')

// Apply leave
router.post('/:emp_id', LeaveController.applyLeave);

// Get all leaves of employee
router.get('/:emp_id', LeaveController.getEmployeeLeaves);

// Get by status (manager view)
router.get('/',LeaveUpdateAuthorization, LeaveController.getLeavesByStatus);

// Approve / Reject
router.patch('/:id', LeaveUpdateAuthorization, LeaveController.updateLeaveStatus);

module.exports = router;