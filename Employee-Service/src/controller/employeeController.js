const {EmployeeService} = require('../services');

const createProfile = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await EmployeeService.createFullProfile(req.body);

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
    const result = await EmployeeService.getFullProfile(req.params.id);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    createProfile,
    getProfile
}