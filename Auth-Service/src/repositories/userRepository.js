const {User} = require('../models')
const CrudRepository = require('./crudRepository')

class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async findByEmail(email){
        const response = await User.findOne({
            where: {email},
        });

        return response;
    }
}

module.exports = new UserRepository();