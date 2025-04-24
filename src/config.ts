import * as dotenv from 'dotenv';
import ms, { StringValue } from 'ms';

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

interface TokenConfig {
  secret: string;
  expires: ms.StringValue;
}

interface GlobalConfig {
  server: ServerConfig;
  pagination: PaginationConfig;
  order: SortConfig;
  token: TokenConfig;
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
  token: {
    secret: process.env.TOKEN_SECRET || 'test',
    expires: (process.env.TOKEN_EXPIRES || '1h') as StringValue,
  },
};
