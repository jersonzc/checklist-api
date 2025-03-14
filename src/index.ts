import express from 'express';

import { configuration } from './config.js';

const { port } = configuration.server;

const hostname = '127.0.0.1';

const app = express();

app.get('/', (req, res) => {
  res.send("Hello World!");
})

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
