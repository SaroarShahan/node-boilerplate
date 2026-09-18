const { appCode } = require('./../constants/AppCode');
const { httpStatus } = require('./../constants/HttpStatusCode');
const { CreateResponse } = require('./CreateResponse');

class BaseController {
  httpStatusCode;
  appCode;
  createResponse;
}

BaseController.prototype.appCode = appCode;
BaseController.prototype.httpStatusCode = httpStatus;
BaseController.prototype.createResponse = new CreateResponse();

module.exports = BaseController;
