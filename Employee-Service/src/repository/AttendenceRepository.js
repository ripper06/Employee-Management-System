const CrudRepository = require('./CrudRepository');
const { Attendance, Employee } = require('../models'); 
const { Op } = require('sequelize');
const {AppError} = require('../utils');

class AttendenceRepository extends CrudRepository{
    constructor(){
        super(Attendance);
    }      
     async checkIn(emp_id){
        const today = new Date().toISOString().split('T')[0];

        const existing = await Attendance.findOne({
            where: {
                emp_id,
                date: today
            }
        });

        if(existing){
            throw new AppError('Already checked in today!', 400);
        }

        return await Attendance.create({
            emp_id,
            date: today,
            status: 1,
            in_time: new Date(),
        })
    }

    async checkOut(emp_id){
        const today = new Date().toISOString().split('T')[0];

        const attendance = await Attendance.findOne({
            where: {
                emp_id,
                date: today
            }
        });

        if(!attendance){
            throw new AppError('No active check-in found!', 400);
        }

        if (attendance.out_time) {
            throw new AppError('Already checked out', 400);
        }

        attendance.out_time = new Date();
        await attendance.save();

        return attendance;
    }

    async getAllAttendanceByEmployeeId(emp_id, options = {}) {

        const { limit = 10, offset = 0 } = options;

        const records = await Attendance.findAll({
            where: { emp_id },
            attributes: ['emp_id', 'date', 'status', 'in_time', 'out_time'],
            include: [
            {
                model: Employee,
                as: 'employee',
                attributes: ['first_name', 'last_name'],
            }
            ],
            order: [
            ['date', 'DESC'],
            ['in_time', 'ASC']
            ],
            limit,
            offset
        });

        return records;
    }

    async getMonthlyReport(emp_id, month, year) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0);

        return await Attendance.findAll({
            where: {
                emp_id,
                date: {
                    [Op.between]: [start, end]
                }
            }
        });
    }
}

module.exports = new AttendenceRepository();