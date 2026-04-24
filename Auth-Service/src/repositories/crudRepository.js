
class CrudRepository{

    constructor(model){
        this.model = model;
    }

    async create(data){
        const response = await this.model.create(data);
        return response;
    }

    async delete(id){
        const response =  await this.model.destroy({
            where : {
                id : id,
            }
        });
        return response;
    }

    async getById(id){
        const response = await this.model.findByPk(id);
        return response;
    }

    async getAll(data){
        const response = await this.model.findAll(data);
        return response;
    }

    async update(id,data){
        const response = await this.model.update(data,{
            where : {id:id}
        }) 
        return response;
    }
}

module.exports = CrudRepository;