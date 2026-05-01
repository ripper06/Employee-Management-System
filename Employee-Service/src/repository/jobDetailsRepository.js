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

        async updateByEmployeeId(employee_id, data, options = {}) {
        const response = await JobDetails.update(data, {
          where: { employee_id },
          ...options
        });
        return response;
    }
}

module.exports = new JobDetailsRepository();