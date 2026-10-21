const serializeError = (error) => ({
  message: error.message,
  stack: error.stack,
});

const log = (level, payload) => {
  const logPayload = {
    level,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  if (payload.error instanceof Error) {
    logPayload.error = serializeError(payload.error);
  }

  const output = JSON.stringify(logPayload);
  if (level === 'error') {
    process.stderr.write(`${output}\n`);
  } else {
    process.stdout.write(`${output}\n`);
  }
};

const logger = {
  info(payload) {
    log('info', payload);
  },

  error(payload) {
    log('error', payload);
  },
};

export { logger };
