'use strict';

const {LeaveRepo} = require('../repositories');
const { AppError } = require('../utils');

class LeaveRequestService {

  async applyLeave(data) {
    const { emp_id, from_date, to_date, reason } = data;

    if (!emp_id || !from_date || !to_date) {
      throw new AppError('Missing required fields', 400);
    }

    if (new Date(to_date) < new Date(from_date)) {
      throw new AppError('Invalid date range', 400);
    }

    const overlap = await LeaveRepo.findOverlappingLeave(emp_id, from_date, to_date);

    if (overlap) {
      throw new AppError('Leave overlaps with existing request', 400);
    }

    return await LeaveRepo.create({
      emp_id,
      from_date,
      to_date,
      reason
    });
  }

  async getEmployeeLeaves(emp_id) {
    return await LeaveRepo.findAllByEmployee(emp_id);
  }

  async getLeavesByStatus(status) {
    return await LeaveRepo.findAllByStatus(status);
  }

  async updateLeaveStatus(id, status) {
    const leave = await LeaveRepo.findById(id);

    if (!leave) {
      throw new AppError('Leave request not found', 404);
    }

    if (leave.status !== 'PENDING') {
      throw new AppError('Only pending requests can be updated', 400);
    }

    return await LeaveRepo.update(id, {
      status
    });
  }
}

module.exports = new LeaveRequestService();