const rTracer = require('cls-rtracer');
const { appCode } = require('./../constants/AppCode');
const { httpStatus } = require('./../constants/HttpStatusCode');

class CreateResponse {
  success(res, ResponseMessageObj) {
    ResponseMessageObj.requestId = rTracer.id();

    if (!ResponseMessageObj.httpStatusCode) {
      ResponseMessageObj.httpStatusCode = httpStatus.ok;
    }

    if (!ResponseMessageObj.appCode) {
      ResponseMessageObj.appCode = appCode.success;
    }

    res.status(ResponseMessageObj.httpStatusCode);
    res.send(ResponseMessageObj);
  }

  error(res, ResponseMessageObj) {
    ResponseMessageObj.requestId = rTracer.id();
    if (!ResponseMessageObj.httpStatusCode) {
      ResponseMessageObj.httpStatusCode = httpStatus.internalServerError;
    }

    if (!ResponseMessageObj.appCode) {
      ResponseMessageObj.appCode = appCode.error;
    }

    res.status(ResponseMessageObj.httpStatusCode);
    res.send(ResponseMessageObj);
  }
}

module.exports = { CreateResponse };
