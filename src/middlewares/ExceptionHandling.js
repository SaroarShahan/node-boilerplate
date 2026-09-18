const { BaseError } = require('sequelize');
const { appCode } = require('../constants/AppCode');
const { httpStatus } = require('../constants/HttpStatusCode');
const { CreateResponse } = require('../utils/CreateResponse');
const { ResponseMessage } = require('../utils/ResponseMessage');
const { logger } = require('../utils/logger');

const exceptionHandling = (err, _req, res, _next) => {
  logger.error({
    message: 'Unhandled application error',
    context: 'ExceptionHandling',
    error: err,
  });

  const response = new ResponseMessage();
  response.appCode = err instanceof BaseError ? appCode.error : err.appCode || appCode.error;
  response.httpStatusCode = err.httpStatusCode || httpStatus.internalServerError;
  response.message = err.message || 'Internal server error';
  response.errorCode = err.errorCode || '';
  response.additionalData = err.additionalData;
  response.errorSource = err.errorSource;

  if (err.value && err.error && err.type) {
    response.appCode = appCode.error;
    response.httpStatusCode = httpStatus.badRequest;
    response.message = err.error.message || 'Validation error';
  }

  if (err instanceof BaseError) {
    response.httpStatusCode = httpStatus.internalServerError;
    response.message = 'Database error';
  }

  new CreateResponse().error(res, response);
};

module.exports = { exceptionHandling };
