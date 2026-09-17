const express = require('express');
const rTracer = require('cls-rtracer');

const { RouteBinder } = require('./routes');
const { logger } = require('./utils/logger');
const { resourceNotFound } = require('./middlewares/ResourcesNotFound');
const { exceptionHandling } = require('./middlewares/ExceptionHandling');

const apiBaseUri = '/api/v1';

class App {
  initRoutes(app) {
    app.use(apiBaseUri, RouteBinder.bindRoutes());

    logger.info({
      message: '########## Routes initialized ###########',
      context: this.initRoutes.name,
    });
  }

  initMiddleware(app) {
    app.use(exceptionHandling);
    app.use(resourceNotFound);

    logger.info({
      message: '########## Middleware initialized ###########',
      context: this.initMiddleware.name,
    });
  }

  initHealthCheck(app) {
    app.get('/health', (req, res) => {
      res.json({
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
      });
    });

    logger.info({
      message: '########## Health check initialized ###########',
      context: this.initHealthCheck.name,
    });
  }

  initGlobalVariable() {
    global.isProduction = process.env.NODE_ENV;

    logger.info({
      message: '########## Global variables initialized ###########',
      context: this.initGlobalVariable.name,
    });
  }

  init() {
    const app = express();
    app.use(express.json());
    app.use(rTracer.expressMiddleware());
    this.initGlobalVariable();
    this.initHealthCheck(app);
    this.initRoutes(app);
    this.initMiddleware(app);
    app.disable('x-powered-by');

    return app;
  }
}

function createApp() {
  return new App().init();
}

module.exports = { App, createApp };
