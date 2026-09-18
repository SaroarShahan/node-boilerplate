const { appCode } = require('../constants/AppCode');
const { httpStatus } = require('../constants/HttpStatusCode');
const { ResponseMessage } = require('../utils/ResponseMessage');

const resourceNotFound = (req, res) => {
  const obj = new ResponseMessage();
  obj.appCode = appCode.error;
  obj.httpStatusCode = httpStatus.notFound;
  obj.message = 'resource not found';
  res.status(httpStatus.notFound).send(obj);
};

module.exports = { resourceNotFound };
