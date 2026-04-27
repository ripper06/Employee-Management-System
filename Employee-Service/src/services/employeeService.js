const { sequelize } = require('../models');
const {AppError} = require('../utils');
const {EmployeeRepo} = require('../repository')
const {EmployeeDetailsRepo} = require('../repository')
const {JobDetailsRepo} = require('../repository')

class EmployeeService{

  //CREATE NEW EMPLOYEE
  async createFullProfile(data, userId) {
      const { employee, employeeDetails, jobDetails } = data;

      return await sequelize.transaction(async (t) => {

        employee.user_id = userId;

        const existing = await EmployeeRepo.findByUserId(userId, { transaction: t });

        if (existing) {
          throw new AppError("Employee already exists for this user", 409);
        }

        const emp = await EmployeeRepo.create(employee, { transaction: t });

        employeeDetails.employee_id = emp.id;
        jobDetails.employee_id = emp.id;

        const details = await EmployeeDetailsRepo.create(employeeDetails, { transaction: t });
        const job = await JobDetailsRepo.create(jobDetails, { transaction: t });

        return {
          employee: emp,
          employeeDetails: details,
          jobDetails: job
        };
      });
}

  //GET EMPLOYEE DETAILS
    async getFullProfile(id) {

    const employee = await EmployeeRepo.findById(id);

    if (!employee) throw new AppError("Employee not found", 404);

    const employeeDetails = await EmployeeDetailsRepo.findByEmployeeId(employee.id);
    const jobDetails = await JobDetailsRepo.findByEmployeeId(employee.id);

    return {
      employee,
      employeeDetails,
      jobDetails
    };
  }

  async getEmployeesByDepartment(department) {

    if (!department) {
      throw new AppError("Department is required", 400);
    }

    const employees = await EmployeeRepo.findByDepartment(department);

    if (!employees || employees.length === 0) {
      throw new AppError("No employees found for this department", 404);
    }

    return employees;
  }

}

module.exports = new EmployeeService();