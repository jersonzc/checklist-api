import http from 'http';

import { app } from './app/index.js';
import { configuration } from './config.js';

const hostname = '127.0.0.1';
const { port } = configuration.server;

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
