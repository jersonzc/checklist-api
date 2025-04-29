import winston from 'winston';
import morgan from 'morgan';
import express from 'express';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json({ space: 2 }),
  ),
  transports: [new winston.transports.Console()],
});

if (process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  );
}

morgan.token('id', (req: express.Request) => req.id);

export const HTTPLogger = morgan(
  ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :id',
  {
    stream: {
      write: (message) => logger.info(message),
    },
  },
);
