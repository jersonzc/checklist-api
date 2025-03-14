import express, { NextFunction } from 'express';

export const app = express();

app.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to the API' });
});

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
