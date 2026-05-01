const { EmployeeDetails } = require('../models');
const CrudRepository = require('./crudRepository');

class EmployeeDetailsRepository extends CrudRepository{
    constructor(){
        super(EmployeeDetails);
    }

    async findByEmployeeId(employee_id, options = {}) {
        return await EmployeeDetails.findOne({ 
            where: { employee_id } ,
            ...options
        });
    }

    async updateByEmployeeId(employee_id, data, options = {}) {
        const response = await EmployeeDetails.update(data, {
          where: { employee_id },
          ...options
        });
}
}

module.exports = new EmployeeDetailsRepository();