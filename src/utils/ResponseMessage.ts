interface ResponseMessageData {
  [key: string]: unknown;
}

class ResponseMessage {
  httpStatusCode: number | null;
  appCode: number | null;
  message: string;
  data: ResponseMessageData;
  errorCode: number | undefined;
  additionalData: ResponseMessageData | undefined;
  errorSource: string | undefined;

  constructor(
    _data: ResponseMessageData = {},
    _httpStatusCode: number = 0,
    _appCode: number = 0,
    _message: string = '',
  ) {
    this.httpStatusCode = _httpStatusCode || null;
    this.appCode = _appCode || null;
    this.message = _message || '';
    this.data = _data || {};
  }
}

export { ResponseMessage };
