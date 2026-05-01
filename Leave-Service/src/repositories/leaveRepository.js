 const {AppError} = require('../utils');
 const {LeaveRequest} = require('../models');

class LeaveRequestRepository {

  async create(data, options = {}) {
    return await LeaveRequest.create(data, options);
  }

  async findById(id) {
    return await LeaveRequest.findByPk(id);
  }

  async findAllByEmployee(emp_id) {
    return await LeaveRequest.findAll({
      where: { emp_id },
      order: [['createdAt', 'DESC']]
    });
  }

  async findAllByStatus(status) {
    return await LeaveRequest.findAll({
      where: { status },
      order: [['createdAt', 'DESC']]
    });
  }

  async update(id, data) {
    const leave = await LeaveRequest.findByPk(id);
    if (!leave) return null;

    return await leave.update(data);
  }

  // 🔥 Overlap check
  async findOverlappingLeave(emp_id, from_date, to_date) {
    return await LeaveRequest.findOne({
      where: {
        emp_id,
        status: ['PENDING', 'APPROVED'],
        from_date: {
          [require('sequelize').Op.lte]: to_date
        },
        to_date: {
          [require('sequelize').Op.gte]: from_date
        }
      }
    });
  }
}

module.exports = new LeaveRequestRepository();