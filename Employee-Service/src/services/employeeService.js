const { sequelize } = require('../models');
const {AppError} = require('../utils');
const {EmployeeRepo} = require('../repository')
const {EmployeeDetailsRepo} = require('../repository')
const {JobDetailsRepo} = require('../repository');

//const redisClient = require('../utils/redis');

class EmployeeService{

  //CREATE NEW EMPLOYEE
  async createFullProfile(data, {userId}) {
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
  async getFullProfile(id,additionalInfo) {
    
    // const cacheKey = `employee-details:${id}`;

    // const cached = await redisClient.get(cacheKey);
    //     if (cached) {
    //       console.log('⚡ Cache HIT (profile)');
    //       return JSON.parse(cached);
    //     }

    // console.log('❌ Cache MISS (profile)');


    const employee = await EmployeeRepo.findById(id);

    if (!employee) throw new AppError("Employee not found", 404);

    const employeeDetails = await EmployeeDetailsRepo.findByEmployeeId(employee.id);
    const jobDetails = await JobDetailsRepo.findByEmployeeId(employee.id);

    const result =  {
      employee,
      employeeDetails,
      jobDetails,
      additionalInfo
    }

    //await redisClient.setEx(cacheKey, 60, JSON.stringify(result));

    return result;
  }

  async getEmployeesByDepartment(department) {

    if (!department) {
      throw new AppError("Department is required", 400);
    }

    let employees;

    if(department=='ALL') employees = await EmployeeRepo.findAllEmployees();
    else employees = await EmployeeRepo.findByDepartment(department);

    if (!employees || employees.length === 0) {
      throw new AppError("No employees found for this department", 404);
    }

    return employees;
  }

  async getAllEmployees(){
    const employees = await EmployeeRepo.findAll();
    return employees;
  }

async updateEmployee(id, data) {
  
  const { employee, employeeDetails, jobDetails } = data;

  if(!employee && !employeeDetails && !jobDetails){
    throw new AppError("At least one of employee, employeeDetails or jobDetails must be provided for update", 400);
  };

  const existingEmployee = await EmployeeRepo.findById(id);

  if (!existingEmployee) {
    throw new AppError("Employee not found", 404);
  }

  // Update main employee
  if (employee) {
    await EmployeeRepo.update(id, employee);
  }

  // Update employee details
  if (employeeDetails) {
    await EmployeeDetailsRepo.updateByEmployeeId(id, employeeDetails);
  }

  // Update job details
  if (jobDetails) {
    await JobDetailsRepo.updateByEmployeeId(id, jobDetails);
  }

  return true;
}

async CheckIsRegistered(userId){
   const result = await EmployeeRepo.findByUserId(userId);
   console.log("CheckIsRegistered result:", result?.dataValues?.id);
   if(result) return {
    id: result?.dataValues?.id, 
    isRegistered: true
  };
   return {
    id: null,
    isRegistered: false
  };
}

}

module.exports = new EmployeeService();