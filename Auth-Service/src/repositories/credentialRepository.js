const CrudRepository = require('./crudRepository')
const {UserCredential} = require('../models');

class UserCredentialRepository extends CrudRepository{
    constructor(){
        super(UserCredential);
    }

    async findByUserId(user_id) {
        return await this.model.findOne({ 
            where: { user_id },
            include : 'User'

        });
    }

}

module.exports = new UserCredentialRepository();