import express from 'express';

export const app = express();

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

// No route found
app.use((req, res, next) => {
  res.status(404);
  res.json({
    message: 'Error. Route not found!',
  });
});
