const { AuthServices } = require('../services/Auth/AuthServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils/logger');
const BaseController = require('../utils/BaseController');
const { ResponseMessage } = require('../utils/ResponseMessage');

const authServices = new AuthServices();

class AuthController extends BaseController {
  constructor() {
    super();
  }

  async register(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.register });
      logger.info({
        message: 'Register Req Body',
        context: loggerContexts.register,
        data: req.body,
      });

      const { username, email, password, gender, roleId } = req.body;
      const responseObj = new ResponseMessage();

      if (!username || !email || !password || !gender || !roleId) {
        responseObj.httpStatusCode = 400;
        responseObj.message = 'Username, email, password, gender, and roleId are required';
      } else {
        responseObj.data = await authServices.register({
          username,
          email,
          password,
          gender,
          roleId,
        });
        responseObj.httpStatusCode = 201;
        responseObj.message = 'Registration has been completed successfully!';
      }

      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.register });
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.login });
      logger.info({
        message: 'Login Req Body',
        context: loggerContexts.login,
        data: { email: req.body.email },
      });

      const responseObj = new ResponseMessage();
      const { email, password } = req.body;

      if (!email || !password) {
        responseObj.httpStatusCode = 400;
        responseObj.message = 'Email and password are required';
      } else {
        responseObj.data = await authServices.login(email, password);
        responseObj.httpStatusCode = 200;
        responseObj.message = 'Login successful!';
      }

      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.login });
      next(error);
    }
  }
}

module.exports = { AuthController };
