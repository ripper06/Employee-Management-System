const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    AUTH_SERVICE_URL : process.env.AUTH_SERVICE_URL,
    EMPLOYEE_SERVICE_URL : process.env.EMPLOYEE_SERVICE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    LEAVE_SERVICE_URL : process.env.LEAVE_SERVICE_URL,
}