// TODO: Logger Utility (Winston)
// Purpose: Structured logging for the application
// Usage: Import and use throughout the codebase
// Responsibility: Log info, error, warn, debug messages with context
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
      )
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
  exitOnError: false,
});

export default logger;

// usage example
// logger.info('This is an info message');
// logger.error('This is an error message');
// logger.warn('This is a warning message');
// logger.debug('This is a debug message');