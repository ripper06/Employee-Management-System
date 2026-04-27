const {Employee,EmployeeDetails,JobDetails } = require('../models');
const CrudRepository = require('./crudRepository');

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
}

module.exports = new EmployeeRepository();