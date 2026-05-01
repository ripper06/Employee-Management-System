const {EmployeeService} = require('../services');
const {AppError} = require('../utils')

// ✅ Check Registration
const checkIsRegistered = async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id'];
    //console.log("Checking registration for userId:", userId); 

    if (!userId) {
      throw new AppError("User ID missing in headers!", 400);
    }

    const isRegistered = await EmployeeService.CheckIsRegistered(userId);

    res.status(200).json({
      success: true,
      data : isRegistered
    });

  } catch (err) {
    next(err);
  }
};

const createProfile = async (req, res, next) => {
  try {

    const additionalInfo = {
      userId : req.headers['x-user-id'],
      email : req.headers['x-user-email'],
      role : req.headers['x-user-role'],
      lastLogin : req.headers['x-user-last-login'],
      loginCount : req.headers['x-user-login-count']
    };
    

    if (!additionalInfo.userId) {
      return res.status(401).json({ error: "Unauthorized, Id missing in headers!"});
    }

    const { employee, employeeDetails, jobDetails } = req.body;
    
    if (!employee || !employeeDetails || !jobDetails) {
      throw new AppError("Invalid payload", 400);
    }

    const result = await EmployeeService.createFullProfile(req.body,additionalInfo);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {

  try {
      const additionalInfo = {
      userId : req.headers['x-user-id'],
      email : req.headers['x-user-email'],
      role : req.headers['x-user-role'],
      lastLogin : req.headers['x-user-last-login'],
      loginCount : req.headers['x-user-login-count']
    };

    if(!additionalInfo.userId){
      return res.status(401).json({ error: "Unauthorized, Id missing in headers!"});
    }

    const { id } = req.params;

    if (!id) {
    return next(new AppError("Employee ID is required", 400));
    }

    const result = await EmployeeService.getFullProfile(id,additionalInfo);

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

    if (!department) {
      throw new AppError("Department query parameter is required", 400);
    }

    const result = await EmployeeService.getEmployeesByDepartment(department);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (err) {
    next(err);
  }
};

const getAllEmployee = async(req,res,next)=>{
  try {
    const result = await EmployeeService.getAllEmployees();
    
    if(!result) throw new AppError("No Employees Found!", 400);

    res.status(200).json({
      success : true,
      data : result
    })

  } catch (error) {
    next(error);
  }
}

const updateEmployee = async (req, res, next) => {
  try {
    const {id} = req.params;

    if(!id) throw new AppError("Employee ID is required for update", 400);

    const result = await EmployeeService.updateEmployee(id,req.body);

    res.status(200).json({
      success: true,
      message : "Employee updated successfully"
    });
  } catch (error) {
    next(error);
  }
}


const getEmployeesBatch = async (req, res, next) => {
  try {
    const { ids } = req.body;

    // ✅ Validate input
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing 'ids' in request body"
      });
    }

    // ✅ Call service (NOT repo directly)
    const result = await EmployeeService.getEmployeesByIds(ids);

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
    createProfile,
    getProfile,
    getEmployeesByDepartment,
    getAllEmployee,
    updateEmployee,
    checkIsRegistered,
    getEmployeesBatch
}