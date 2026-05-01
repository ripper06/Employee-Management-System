const { AppError } = require('../utils');

function LeaveUpdateAuthorization(req, res, next) {
    const userRole = req.headers['x-user-role']?.toUpperCase();

    if (!userRole) {
        return next(new AppError("Unauthorized: Missing user role", 401));
    }

    if (userRole !== 'HR' && userRole !== 'ADMIN') {
        return next(new AppError("Forbidden: Only HR and ADMIN can see and update leave status!", 403));
    }

    next();
}

module.exports = {
    LeaveUpdateAuthorization
};