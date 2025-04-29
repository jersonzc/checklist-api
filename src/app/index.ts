import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import { router as api } from '../api/v1/index.js';
import { ErrorResponse } from '../types.js';

export const app = express();

// Parse JSON
app.use(express.json());

// Request ID
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id = uuidv4();
    res.setHeader('X-Request-Id', id);
    next();
  },
);

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
    res.status(status);
    res.json({
      error: { status, message },
    });
  },
);
