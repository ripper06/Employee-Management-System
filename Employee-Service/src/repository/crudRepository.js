const {AppError} = require('../utils');

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data, options = {}) {
    return await this.model.create(data, options);
  }

  async destroy(id, options = {}) {
    const response = await this.model.destroy({
      where: { id },
      ...options
    });

    if (!response) {
      throw new AppError('Not able to find the resource', 404);
    }

    return response;
  }

  async findById(id, options = {}) {
    const response = await this.model.findByPk(id, options);

    if (!response) {
      throw new AppError('Not able to find the resource', 404);
    }

    return response;
  }

  async findAll(options = {}) {
    return await this.model.findAll(options);
  }

  async update(id, data, options = {}) {
    const response = await this.model.update(data, {
      where: { id },
      ...options
    });

    if (!response) {
      throw new AppError('Not able to find the resource', 404);
    }

    return response;
  }
}

module.exports = CrudRepository;