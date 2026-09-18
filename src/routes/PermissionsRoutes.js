const express = require('express');

const { PermissionsController } = require('../controllers/PermissionsController');
const { authenticateToken, optionalAuthenticateToken } = require('../middlewares/auth');
const { hasPermission } = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  createPermissionSchema,
  deletePermissionSchema,
  getPermissionSchema,
  getPermissionsSchema,
  updatePermissionSchema,
} = require('../validations/permissionValidation');

class PermissionsRoutes {
  static configureRoutes() {
    const router = express.Router();
    const permissionsController = new PermissionsController();

    router
      .route('/')
      .get(
        [optionalAuthenticateToken, validate(getPermissionsSchema)],
        permissionsController.getAllPermissions,
      )
      .post(
        [authenticateToken, hasPermission('permissions.create'), validate(createPermissionSchema)],
        permissionsController.createPermission,
      );

    router
      .route('/:id')
      .get(
        [optionalAuthenticateToken, validate(getPermissionSchema)],
        permissionsController.getPermission,
      )
      .patch(
        [authenticateToken, hasPermission('permissions.update'), validate(updatePermissionSchema)],
        permissionsController.updatePermission,
      )
      .delete(
        [authenticateToken, hasPermission('permissions.delete'), validate(deletePermissionSchema)],
        permissionsController.deletePermission,
      );

    return router;
  }
}

module.exports = { PermissionsRoutes };
