'use strict';

const {LeaveRepo} = require('../repositories');
const { AppError } = require('../utils');
const axios = require("axios");

class LeaveRequestService {

  async applyLeave(data) {
    const { emp_id, from_date, to_date, reason } = data;

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
  try {
    const leaves = await LeaveRepo.findAllByStatus(status);

    if (!leaves || leaves.length === 0) return [];

    const empIds = [...new Set(leaves.map(l => l.emp_id))];
    console.log('Unique Employee IDs:', empIds);

    const response = await axios.post(
      "http://localhost:3002/api/v1/employees/batch",
      { ids: empIds }
    );

    // ✅ FIX HERE
    const employeeMap = response.data.data;

    const result = leaves.map(l => ({
      id: l.id,
      emp_id: l.emp_id,
      from_date: l.from_date,
      to_date: l.to_date,
      reason: l.reason,
      status: l.status,
      employeeName: employeeMap[l.emp_id]
        ? `${employeeMap[l.emp_id].first_name} ${employeeMap[l.emp_id].last_name}`
        : "Unknown"
    }));

    return result;

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
    throw new AppError("Failed to fetch leaves with employee data", 500);
  }
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