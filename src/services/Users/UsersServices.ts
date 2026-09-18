import { UsersRepository } from '../../respository/Users/UsersRepository';

class UsersServices {
  static instance: any;
  usersRepository: any;

  constructor() {
    if (UsersServices.instance) return UsersServices.instance;

    this.usersRepository = new UsersRepository();
    UsersServices.instance = this;
  }

  async getAllUsers(req) {
    const { page } = req.query;
    const { rows, count, limit } = await this.usersRepository.findAndCountAllUsers(req.query);

    return {
      totalCount: count,
      users: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
  }

  async getUser(id) {
    return await this.usersRepository.findById(id);
  }

  async createUser(data) {
    return await this.usersRepository.create(data);
  }

  async updateUser(id, data) {
    return await this.usersRepository.update(id, data);
  }

  async deleteUser(id) {
    return await this.usersRepository.delete(id);
  }
}

export { UsersServices };
