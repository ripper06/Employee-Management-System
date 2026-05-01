const { AttendanceService } = require('../services');
const { AppError } = require('../utils');

const checkIn = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(new AppError("Employee ID is required", 400));
        }
        const attendance = await AttendanceService.checkIn(id);

        res.status(200).json({ success: true, data: attendance });

    } catch (error) {
        next(error);
    }
};

const checkOut = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
        return next(new AppError("Employee ID is required", 400));
    }
    const result = await AttendanceService.checkOut(id);

    return res.status(200).json({ success: true, data: result });

  } catch (err) {
    next(err);
  }
};

const getMonthlyReport = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
        return next(new AppError("Employee ID is required", 400));
    }
    
    const { month, year } = req.query;
    const result = await AttendanceService.getMonthlyReport(
      id,
      month,
      year
    );
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const getAllAttendanceByEmployeeId = async (req, res, next) => {
    try {
      const {emp_id} = req.params;
      if (!emp_id) {
          return next(new AppError("Employee ID is required in params!", 400));
      }
      const { limit, offset } = req.query;
      const options = {};
      if (limit) options.limit = parseInt(limit);
      if (offset) options.offset = parseInt(offset);  

      const result = await AttendanceService.getAllAttendanceByEmployeeId(emp_id, options);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
}



module.exports = {
    checkIn,
    checkOut,
    getMonthlyReport,
    getAllAttendanceByEmployeeId
}