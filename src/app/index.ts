import express, { NextFunction } from 'express';

import { router as api } from '../api/index.js';

export const app = express();

// Setup API routes
app.use('/api', api);

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
    err: Error,
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
