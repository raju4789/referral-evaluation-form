// src/utils/logger.ts
import winston from 'winston';

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Default log level is 'info'
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    // Log to console
    new winston.transports.Console({ format: winston.format.simple() }),
    // Log to file (optional, useful for production)
    new winston.transports.File({ filename: 'logs/app.log' })
  ],
});

export default logger;
