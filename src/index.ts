import http from 'http';

import { app } from './app/index.js';
import { configuration } from './config.js';
import { connect } from './app/database.js';

// Connect to the database
connect();

const hostname = '127.0.0.1';
const { port } = configuration.server;

// Create server
const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
