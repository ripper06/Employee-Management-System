const {Employee} = require('../models');
const CrudRepository = require('./crudRepository');

class EmployeeRepository extends CrudRepository{
    constructor(){
        super(Employee);
    }

    async findByUserId(user_id) {
        return await Employee.findOne({ where: { user_id } });
    }
}

module.exports = new EmployeeRepository();