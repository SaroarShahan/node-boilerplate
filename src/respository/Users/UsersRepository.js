const { UserModel } = require('../../models');
const { usersQueryBuilder } = require('./usersQueryBuilder');

class UsersRepository {
  constructor() {
    if (UsersRepository.instance) return UsersRepository.instance;

    UsersRepository.instance = this;
  }

  async create(data) {
    return UserModel.create(data);
  }

  async findAndCountAll(options) {
    return UserModel.findAndCountAll(options);
  }

  async findAndCountAllUsers(query) {
    const options = usersQueryBuilder(query);
    return { ...(await UserModel.findAndCountAll(options)), limit: options.limit };
  }

  async findById(id) {
    return UserModel.findByPk(id);
  }

  async update(id, data) {
    const user = await UserModel.findByPk(id);

    if (!user) return null;

    return user.update(data);
  }

  async delete(id) {
    const user = await UserModel.findByPk(id);

    if (!user) return null;

    return user.destroy();
  }
}

module.exports = { UsersRepository };
