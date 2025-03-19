import * as dotenv from 'dotenv';

dotenv.config();

interface PaginationConfig {
  limit: number;
  offset: number;
}

interface ServerConfig {
  port: number;
}

interface GlobalConfig {
  server: ServerConfig;
  pagination: PaginationConfig;
}

export const configuration: GlobalConfig = {
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  pagination: {
    limit: 10,
    offset: 0,
  },
};
