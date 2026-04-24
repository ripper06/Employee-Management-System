const { EmployeeDetails } = require('../models');
const CrudRepository = require('./crudRepository');

class EmployeeDetailsRepository extends CrudRepository{
    constructor(){
        super(EmployeeDetails);
    }

    async findByEmployeeId(employee_id) {
        return await EmployeeDetails.findOne({ where: { employee_id } });
    }
}

module.exports = new EmployeeDetailsRepository();