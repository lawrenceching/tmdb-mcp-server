import pino from 'pino';
import path from 'path';

const logDir = '/tmp';
const logFilePath = path.join(logDir, 'app.log');

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.multistream([
    {
      level: 'info',
      stream: pino.destination({ dest: logFilePath, sync: false }),
    },
  ])
);

export default logger;
