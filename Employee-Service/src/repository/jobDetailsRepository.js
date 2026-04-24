const { JobDetails } = require('../models');
const CrudRepository = require('./crudRepository');

class JobDetailsRepository extends CrudRepository{
    constructor(){
        super(JobDetails);
    }

    async findByEmployeeId(employee_id) {
        return await JobDetails.findOne({ where: { employee_id } });
    }
}

module.exports = new JobDetailsRepository();