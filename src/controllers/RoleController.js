const { RolesServices } = require('../services/Roles/RolesServices');
const { loggerContexts } = require('../constants/loggerContexts');
const { logger } = require('../utils/logger');
const BaseController = require('../utils/BaseController');
const { ResponseMessage } = require('../utils/ResponseMessage');

const rolesServices = new RolesServices();

class RoleController extends BaseController {
  constructor(roleRepository) {
    super();
    this.roleRepository = roleRepository;
  }

  async getAllRoles(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.getAllRoles });
      const roles = await rolesServices.getAllRoles(req);
      const responseObj = new ResponseMessage();

      responseObj.data = roles;
      responseObj.httpStatusCode = 200;
      responseObj.message = 'Fetched all roles successfully';

      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.getAllRoles });
      next(error);
    }
  }

  async getRole(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.getRole });
      const role = await rolesServices.getRole(req.params.id);
      const responseObj = new ResponseMessage();

      responseObj.data = role || {};
      responseObj.httpStatusCode = role ? 200 : 404;
      responseObj.message = role ? 'Fetched role successfully' : 'Role not found';

      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.getRole });
      next(error);
    }
  }

  async createRole(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.createRole });
      logger.info({
        message: 'Create Role Req Body',
        context: loggerContexts.createRole,
        data: req.body,
      });

      const { name, permissions } = req.body;
      const responseObj = new ResponseMessage();
      if (!name) {
        responseObj.httpStatusCode = 400;
        responseObj.message = 'Role name is required';
      } else if (!Array.isArray(permissions) || permissions.length === 0) {
        responseObj.httpStatusCode = 400;
        responseObj.message = 'At least one permission is required';
      } else {
        const existingRole = await rolesServices.roleRepository.findOne({
          where: { name },
        });
        if (existingRole) {
          responseObj.httpStatusCode = 409;
          responseObj.message = 'Role with this name already exists';
        } else {
          responseObj.data = await rolesServices.createRole({ name, permissions });
          responseObj.httpStatusCode = 201;
          responseObj.message = 'Role created successfully';
        }
      }

      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.createRole });
      next(error);
    }
  }

  async updateRole(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.updateRole });
      logger.info({
        message: 'Update Role Req Body',
        context: loggerContexts.updateRole,
        data: req.body,
      });

      const responseObj = new ResponseMessage();
      const role = await rolesServices.getRole(req.params.id);
      const { name, permissions } = req.body;

      if (!name) {
        responseObj.httpStatusCode = 400;
        responseObj.message = 'Role name is required';
      } else if (!role) {
        responseObj.httpStatusCode = 404;
        responseObj.message = 'Role not found';
      } else {
        const existingRole = await rolesServices.roleRepository.findOne({
          where: { name },
        });
        if (existingRole && String(existingRole.id) !== String(role.id)) {
          responseObj.httpStatusCode = 409;
          responseObj.message = 'Role with this name already exists';
        } else if (
          typeof permissions !== 'undefined' &&
          (!Array.isArray(permissions) || permissions.length === 0)
        ) {
          responseObj.httpStatusCode = 400;
          responseObj.message = 'At least one permission is required';
        } else {
          responseObj.data = await rolesServices.updateRole(req.params.id, {
            name,
            permissions,
          });
          responseObj.httpStatusCode = 200;
          responseObj.message = 'Role updated successfully';
        }
      }

      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.updateRole });
      next(error);
    }
  }

  async deleteRole(req, res, next) {
    try {
      logger.info({ message: 'Start executing method', context: loggerContexts.deleteRole });
      const result = await rolesServices.deleteRole(req.params.id);
      const responseObj = new ResponseMessage();

      responseObj.data = result.role || {};
      responseObj.httpStatusCode = result.role ? 200 : 404;
      responseObj.message = result.role ? 'Role deleted successfully' : 'Role not found';

      super.createResponse.success(res, responseObj);
    } catch (error) {
      logger.error({ error, context: loggerContexts.deleteRole });
      next(error);
    }
  }
}

module.exports = { RoleController };
