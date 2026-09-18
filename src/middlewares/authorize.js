const { USER_ROLES } = require('../constants');
const { httpStatus } = require('../constants/HttpStatusCode');
const { AppError } = require('../utils/AppError');

const authorizationError = (message, statusCode) =>
  new AppError(message, 'authorization', {}, true, statusCode);

const hasPermission = (requiredPermission) => (req, _res, next) => {
  try {
    if (!req.user) {
      return next(
        authorizationError('Not authorized to access this route', httpStatus.unAuthorised),
      );
    }

    if (req.user.role === USER_ROLES.ADMIN) {
      return next();
    }

    if (!req.user.role) {
      return next(
        authorizationError(
          'You do not have permission to perform this action',
          httpStatus.forbidden || 403,
        ),
      );
    }

    const permissions = Array.isArray(req.user.permissions) ? req.user.permissions : [];

    if (!permissions.includes(requiredPermission)) {
      return next(
        authorizationError(
          'You do not have permission to perform this action',
          httpStatus.forbidden || 403,
        ),
      );
    }

    return next();
  } catch (error) {
    return next(authorizationError('Error checking permissions', httpStatus.internalServerError));
  }
};

module.exports = { hasPermission };
