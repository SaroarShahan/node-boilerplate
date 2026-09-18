const express = require('express');

const { AuthController } = require('../controllers/AuthController');
const validate = require('../middlewares/validate');
const { loginSchema, registerSchema } = require('../validations/authValidation');

class AuthRoutes {
  static configureRoutes() {
    const router = express.Router();
    const authController = new AuthController();

    router.post('/register', [validate(registerSchema)], authController.register);
    router.post('/login', [validate(loginSchema)], authController.login);

    return router;
  }
}

module.exports = { AuthRoutes };
