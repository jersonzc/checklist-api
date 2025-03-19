import * as dotenv from 'dotenv';

dotenv.config();

interface SortConfig {
  direction: string;
  orderBy: string;
  options: string[];
}

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
  order: SortConfig;
}

export const configuration: GlobalConfig = {
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  pagination: {
    limit: 10,
    offset: 0,
  },
  order: {
    direction: 'desc',
    orderBy: 'createdAt',
    options: ['asc', 'desc'],
  },
};
