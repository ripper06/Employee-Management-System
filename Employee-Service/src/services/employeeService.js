const { sequelize } = require('../models');
const {AppError} = require('../utils');
const {EmployeeRepo} = require('../repository')
const {EmployeeDetailsRepo} = require('../repository')
const {JobDetailsRepo} = require('../repository')

class EmployeeService{
    async createFullProfile(data) {
    const { employee, employeeDetails, jobDetails } = data;

    const t = await sequelize.transaction();

    try {
        const existing = await EmployeeRepo.findByUserId(employee.user_id);

        if (existing) {
            throw new AppError("Employee already exists for this user", 409);
        }
            // 1. create employee
        const emp = await EmployeeRepo.create(employee, { transaction: t});

        // 2. attach employee_id everywhere
        employeeDetails.employee_id = emp.id;
        jobDetails.employee_id = emp.id;

        // 3. create details
        const details = await EmployeeDetailsRepo.create(employeeDetails,{ transaction: t });
        const job = await JobDetailsRepo.create(jobDetails,{ transaction: t });

        await t.commit();

        return {
        employee: emp,
        employeeDetails: details,
        jobDetails: job
        };
    } catch (error) {
        t.rollback();
        throw error;
    }

  }

    async getFullProfile(employee_id) {

    const employee = await EmployeeRepo.findById(employee_id);

    if (!employee) throw new AppError("Employee not found", 404);

    const employeeDetails = await EmployeeDetailsRepo.findByEmployeeId(employee_id);
    const jobDetails = await JobDetailsRepo.findByEmployeeId(employee_id);

    return {
      employee,
      employeeDetails,
      jobDetails
    };
  }

}

module.exports = new EmployeeService();