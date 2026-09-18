const express = require('express');

const { RoleController } = require('../controllers/RoleController');
const { authenticateToken, optionalAuthenticateToken } = require('../middlewares/auth');
const { hasPermission } = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  createRoleSchema,
  deleteRoleSchema,
  getRoleSchema,
  getRolesSchema,
  updateRoleSchema,
} = require('../validations/roleValidation');

class RolesRoutes {
  static configureRoutes() {
    const router = express.Router();
    const roleController = new RoleController();

    router
      .route('/')
      .get([optionalAuthenticateToken, validate(getRolesSchema)], roleController.getAllRoles)
      .post(
        [authenticateToken, hasPermission('roles.create'), validate(createRoleSchema)],
        roleController.createRole,
      );

    router
      .route('/:id')
      .get([optionalAuthenticateToken, validate(getRoleSchema)], roleController.getRole)
      .patch(
        [authenticateToken, hasPermission('roles.update'), validate(updateRoleSchema)],
        roleController.updateRole,
      )
      .delete(
        [authenticateToken, hasPermission('roles.delete'), validate(deleteRoleSchema)],
        roleController.deleteRole,
      );

    return router;
  }
}

module.exports = { RolesRoutes };
