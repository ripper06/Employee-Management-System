const { JobDetails } = require('../models');
const CrudRepository = require('./crudRepository');

class JobDetailsRepository extends CrudRepository{
    constructor(){
        super(JobDetails);
    }

    async findByEmployeeId(employee_id, options = {}) {
        return await JobDetails.findOne({ 
            where: { employee_id },
            ...options
        });
    }
}

module.exports = new JobDetailsRepository();