import express, { NextFunction } from 'express';

import { router as api } from '../api/v1/index.js';
import { ErrorResponse } from '../types.js';

export const app = express();

// Parse JSON
app.use(express.json());

// Setup API routes
app.use('/api', api);
app.use('/api/v1', api);

// No route found
app.use((req, res, next) => {
  next({
    status: 404,
    message: 'Error. Route not found!',
  });
});

// Error handler
app.use(
  (
    err: ErrorResponse,
    req: express.Request,
    res: express.Response,
    next: NextFunction,
  ) => {
    const { status = 500, message } = err;
    res.status(status);
    res.json({
      error: { status, message },
    });
  },
);
