const { AttendenceRepository } = require('../repository');
const {AppError} = require('../utils')

class AttendanceService{
    async checkIn(emp_id){
        if (!emp_id) {
            throw new AppError("Employee ID is required", 400);
        }
        const result = await AttendenceRepository.checkIn(emp_id);
        return result;
    }

    async checkOut(emp_id){
        if (!emp_id) {
            throw new AppError("Employee ID is required", 400);
        }
        const result = await AttendenceRepository.checkOut(emp_id);
        return result;
    }

    async getAllAttendanceByEmployeeId(emp_id, options = {}) {
        if (!emp_id) {
            throw new AppError("Employee ID is required", 400);
        }
        const result = await AttendenceRepository.getAllAttendanceByEmployeeId(emp_id, options);
        return result;    
    }

    async getMonthlyReport(emp_id, month, year) {
        if (!emp_id) {
            throw new AppError("Employee ID is required", 400);
        }
        const result = await AttendenceRepository.getMonthlyReport(emp_id, month, year);
        return result;  
    }

    async getAllAttendanceByEmployeeId(emp_id, options) {

        if (!emp_id) {
            throw new AppError("Employee ID is required", 400);
        }

        const result = await AttendenceRepository.getAllAttendanceByEmployeeId(emp_id, options);
        return result;
    }
}

module.exports = new AttendanceService();
