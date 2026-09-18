const express = require('express');

const { AuthRoutes } = require('./AuthRoutes');
const { PermissionsRoutes } = require('./PermissionsRoutes');
const { RolesRoutes } = require('./RolesRoutes');
const { UsersRoutes } = require('./UsersRoutes');

class RouteBinder {
  static bindRoutes() {
    const router = express.Router();

    router.use('/auth', AuthRoutes.configureRoutes());
    router.use('/permissions', PermissionsRoutes.configureRoutes());
    router.use('/roles', RolesRoutes.configureRoutes());
    router.use('/users', UsersRoutes.configureRoutes());

    return router;
  }
}

module.exports = { RouteBinder };
