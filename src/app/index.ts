import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import helmet from 'helmet';

import { router as api } from '../api/v1/index.js';
import { HTTPLogger, logger } from './logger.js';
import { ErrorResponse } from '../types.js';

export const app = express();

// Parse JSON
app.use(express.json());

// Request ID
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id = uuidv4();
    req.id = id;
    res.setHeader('X-Request-Id', id);
    next();
  },
);

// Log HTTP request
app.use(HTTPLogger);

// CORS
app.use(
  cors({
    origin: process.env.ORIGIN,
  }),
);

// Helmet
app.use(helmet());

// Setup API routes
app.use('/api', api);
app.use('/api/v1', api);

// No route found
app.use((req, res, next) => {
  next({
    status: 404,
    message: 'route not found',
  });
});

// Error handler
app.use(
  (
    err: ErrorResponse,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { status = 500, message } = err;

    const data = {
      status,
      message,
      traceId: req.id,
    };

    if (status < 500) {
      logger.warn(data);
    } else {
      logger.error(data);
    }

    res.status(status);
    res.json({
      error: { status, message },
    });
  },
);
