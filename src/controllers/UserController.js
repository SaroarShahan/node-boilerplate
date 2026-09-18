const { UsersServices } = require('../services/Users/UsersServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils/logger');
const BaseController = require('../utils/BaseController');
const { ResponseMessage } = require('../utils/ResponseMessage');

const usersServices = new UsersServices();

class UserController extends BaseController {
  constructor(userRepository) {
    super();
    this.userRepository = userRepository;
  }

  async getAllUsers(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getAllUsers,
      });

      const users = await usersServices.getAllUsers(req);
      const responseObj = new ResponseMessage();
      if (users) {
        responseObj.data = users;
        responseObj.httpStatusCode = 200;
        responseObj.message = 'Fetched all users successfully';
        super.createResponse.success(res, responseObj);
      }
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getAllUsers,
      });
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.getUser,
      });

      const user = await usersServices.getUser(req.params.id);
      const responseObj = new ResponseMessage();
      if (user) {
        responseObj.data = user;
        responseObj.httpStatusCode = 200;
        responseObj.message = 'Fetched user successfully';
      } else {
        responseObj.httpStatusCode = 404;
        responseObj.message = 'User not found';
      }
      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.getUser,
      });
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.createUser,
      });
      logger.info({
        message: 'Create User Req Body',
        context: loggerContexts.createUser,
        data: req.body,
      });

      const newUser = await usersServices.createUser(req.body);
      const responseObj = new ResponseMessage();
      responseObj.data = newUser;
      responseObj.httpStatusCode = 201;
      responseObj.message = 'User created successfully';
      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.createUser,
      });
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.updateUser,
      });
      logger.info({
        message: 'Update User Req Body',
        context: loggerContexts.updateUser,
        data: req.body,
      });

      const updatedUser = await usersServices.updateUser(req.params.id, req.body);
      const responseObj = new ResponseMessage();
      responseObj.data = updatedUser || {};
      responseObj.httpStatusCode = updatedUser ? 200 : 404;
      responseObj.message = updatedUser ? 'User updated successfully' : 'User not found';
      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.updateUser,
      });
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      logger.info({
        message: 'Start executing method',
        context: loggerContexts.deleteUser,
      });

      const deletedUser = await usersServices.deleteUser(req.params.id);
      const responseObj = new ResponseMessage();
      responseObj.data = deletedUser || {};
      responseObj.httpStatusCode = deletedUser ? 200 : 404;
      responseObj.message = deletedUser ? 'User deleted successfully' : 'User not found';
      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({
        error,
        context: loggerContexts.deleteUser,
      });
      next(error);
    }
  }
}

module.exports = { UserController };
