import http from 'http';

import { app } from './app/index.js';
import { configuration } from './config.js';
import { connect } from './app/database.js';

// Connect to the database
connect();

const { port } = configuration.server;

// Create server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port} port`);
});
