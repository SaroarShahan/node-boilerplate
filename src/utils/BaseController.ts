import { appCode } from '../constants/AppCode';
import { httpStatus } from '../constants/HttpStatusCode';
import { CreateResponse } from './CreateResponse';

class BaseController {
  httpStatusCode;
  appCode;
  createResponse;
}

BaseController.prototype.appCode = appCode;
BaseController.prototype.httpStatusCode = httpStatus;
BaseController.prototype.createResponse = new CreateResponse();

export default BaseController;
