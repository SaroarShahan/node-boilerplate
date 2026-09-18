const express = require('express');

const { UserController } = require('../controllers/UserController');
const { authenticateToken, optionalAuthenticateToken } = require('../middlewares/auth');
const { hasPermission } = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  getUsersSchema,
  updateUserSchema,
} = require('../validations/userValidation');

class UsersRoutes {
  static configureRoutes() {
    const router = express.Router();
    const userController = new UserController();

    router
      .route('/')
      .get([optionalAuthenticateToken, validate(getUsersSchema)], userController.getAllUsers)
      .post(
        [authenticateToken, hasPermission('users.create'), validate(createUserSchema)],
        userController.createUser,
      );

    router
      .route('/:id')
      .get([optionalAuthenticateToken, validate(getUserSchema)], userController.getUser)
      .patch(
        [authenticateToken, hasPermission('users.update'), validate(updateUserSchema)],
        userController.updateUser,
      )
      .delete(
        [authenticateToken, hasPermission('users.delete'), validate(deleteUserSchema)],
        userController.deleteUser,
      );

    return router;
  }
}

module.exports = { UsersRoutes };
