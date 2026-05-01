'use strict';

const {LeaveService} = require('../services');

const applyLeave = async (req, res, next) => {
  try {
    const {emp_id} = req.params;
    const {from_date, to_date, reason} = req.body;


     if (!emp_id || !from_date || !to_date) {
      throw new AppError('Missing required fields', 400);
    }

    const result = await LeaveService.applyLeave({emp_id, from_date, to_date, reason});

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const getEmployeeLeaves = async (req, res, next) => {
  try {
    const { emp_id } = req.params;

    const result = await LeaveService.getEmployeeLeaves(emp_id);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const getLeavesByStatus = async (req, res, next) => {
  try {
    const { status } = req.query;

    const result = await LeaveService.getLeavesByStatus(status);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const updateLeaveStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await LeaveService.updateLeaveStatus(id, status);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  applyLeave,
  getEmployeeLeaves,
  getLeavesByStatus,
  updateLeaveStatus
};