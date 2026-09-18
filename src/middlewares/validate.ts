const validate = (schema: any = {}) => {
  return (req: any, res: any, next: any) => {
    try {
      if (schema.params) {
        req.params = schema.params.parse(req.params);
      }

      if (schema.query) {
        const parsedQuery = schema.query.parse(req.query);
        Object.keys(req.query).forEach((key) => delete req.query[key]);
        Object.assign(req.query, parsedQuery);
      }

      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      return next();
    } catch (error: any) {
      error.httpStatusCode = 400;
      error.value = true;
      error.type = 'validation';
      return next(error);
    }
  };
};

export default validate;
