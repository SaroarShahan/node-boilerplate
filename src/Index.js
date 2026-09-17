const { startServer, stopServer } = require('./server');
const { loggerContexts } = require('./constants/loggerContexts');
const { logger } = require('./utils/logger');

startServer();

if (process.env.IS_LOCAL !== 'true') {
  process.on('SIGTERM', stopServer);
}

process.on('uncaughtException', (err) => {
  logger.error({
    message: 'Uncaught Exception',
    context: loggerContexts.process,
    data: {
      error: err.message,
      stack: err.stack,
    },
  });
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error({
    message: 'Unhandled Rejection',
    context: loggerContexts.process,
    data: {
      promise,
      reason,
    },
  });
});
