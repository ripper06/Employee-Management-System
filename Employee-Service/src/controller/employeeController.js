const {EmployeeService} = require('../services');
const {AppError} = require('../utils')

const createProfile = async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized, Id missing in headers!"});
    }

    const { employee, employeeDetails, jobDetails } = req.body;
    
    if (!employee || !employeeDetails || !jobDetails) {
      throw new AppError("Invalid payload", 400);
    }

    const result = await EmployeeService.createFullProfile(req.body,userId);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  const userId = req.headers['x-user-id'];
  console.log("userId" + userId);
  try {
    const { id } = req.params;

    if (!id) {
    return next(new AppError("Employee ID is required", 400));
    }

    const result = await EmployeeService.getFullProfile(id);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const getEmployeesByDepartment = async (req, res, next) => {
  try {
    const { department } = req.query;

    const result = await EmployeeService.getEmployeesByDepartment(department);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
    createProfile,
    getProfile,
    getEmployeesByDepartment
}