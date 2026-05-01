const {Employee,EmployeeDetails,JobDetails } = require('../models');
const CrudRepository = require('./crudRepository');
const { Op } = require("sequelize");

class EmployeeRepository extends CrudRepository{
    constructor(){
        super(Employee);
    }

    async findByUserId(user_id, options = {}) {
        return await Employee.findOne({ 
            where: { user_id } ,
            ...options
        });
    }

    async findByDepartment(department, options = {}){
        return Employee.findAll({
            include:[
                {
                    model: EmployeeDetails,
                    as: 'employeeDetails'
                },
                {
                    model: JobDetails,
                    as: 'jobDetails',
                    where:{department}
                }
            ],
            ...options,
        });
    }

    async findAllEmployees(options = {}){
    return Employee.findAll({
        include:[
            {
                model: EmployeeDetails,
                as: 'employeeDetails',
                required: false
            },
            {
                model: JobDetails,
                as: 'jobDetails',
                required: false
            }
        ],
        ...options,
    });
}


async findByEmployeeIds(ids, options = {}) {
    return await Employee.findAll({
        where: {
            id: {
                [Op.in]: ids
            }
        },
        ...options
    });
}


    
}

module.exports = new EmployeeRepository();