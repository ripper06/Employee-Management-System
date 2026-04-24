const {AppError} = require('../utils');

class CrudRepository{
    constructor(model){
        this.model = model;
    }

    async create(data){
     
        const response = await this.model.create(data);
        return response;
        
    }

    async destroy(data){
       
        const response = await this.model.destroy({
            where: {
                id: data,
            }
        });
        if(!response){
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
        
    }

    async findById(data){
       
        const response = await this.model.findByPk(data);
        if(!response){
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
       
    }


    async findAll(data){
       
        const response = await this.model.findAll(data);
        return response;
        
    }

    async update(id, data){//data -> object {col: value, ...}
        
        const response = await this.model.update(data, {
            where : {
                id: id
            }
        });
        if(!response){
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
        }
        return response;
       
    }
}

module.exports = CrudRepository;