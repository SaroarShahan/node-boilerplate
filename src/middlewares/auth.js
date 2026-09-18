const { PermissionModel, RoleModel, UserModel } = require('./../models');
const { appCode } = require('../constants/AppCode');
const { httpStatus } = require('../constants/HttpStatusCode');
const { CreateResponse } = require('../utils/CreateResponse');
const { ResponseMessage } = require('../utils/ResponseMessage');
const { verifyToken } = require('../utils/jwt');

const sendUnauthorized = (res, message) => {
  const responseObj = new ResponseMessage();
  responseObj.appCode = appCode.error;
  responseObj.httpStatusCode = httpStatus.unAuthorised;
  responseObj.message = message;
  new CreateResponse().error(res, responseObj);
};

const isJwtError = (error) =>
  [
    'JWSInvalid',
    'JWSSignatureVerificationFailed',
    'JWTClaimValidationFailed',
    'JWTExpired',
    'JWTInvalid',
  ].includes(error.name);

const attachAuthenticatedUser = async (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return false;

  const payload = await verifyToken(token);
  const user = await UserModel.findByPk(payload.id, {
    attributes: ['id', 'userName', 'email', 'status', 'roleId'],
    include: [
      {
        model: RoleModel,
        as: 'role',
        attributes: ['id', 'name'],
        include: [
          {
            model: PermissionModel,
            as: 'permissions',
            attributes: ['id', 'name', 'label', 'module'],
            through: { attributes: [] },
          },
        ],
      },
    ],
  });

  if (!user) return null;

  req.user = {
    id: user.id,
    username: user.userName,
    email: user.email,
    status: user.status,
    roleId: user.roleId,
    role: user.role ? user.role.name : null,
    permissions: user.role?.permissions?.map((permission) => permission.name) || [],
  };

  return true;
};

const authenticateToken = async (req, res, next) => {
  try {
    const isAuthenticated = await attachAuthenticatedUser(req);

    if (!isAuthenticated) {
      return sendUnauthorized(
        res,
        req.headers.authorization ? 'Invalid access token' : 'Access token required',
      );
    }

    return next();
  } catch (error) {
    if (isJwtError(error)) {
      return sendUnauthorized(res, 'Invalid or expired token');
    }

    return next(error);
  }
};

const optionalAuthenticateToken = async (req, res, next) => {
  try {
    const isAuthenticated = await attachAuthenticatedUser(req);

    if (isAuthenticated === null) {
      return sendUnauthorized(res, 'Invalid access token');
    }

    return next();
  } catch (error) {
    if (isJwtError(error)) {
      return sendUnauthorized(res, 'Invalid or expired token');
    }

    return next(error);
  }
};

module.exports = {
  attachAuthenticatedUser,
  authenticateToken,
  optionalAuthenticateToken,
};
