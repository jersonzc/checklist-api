import * as dotenv from 'dotenv';

dotenv.config();

interface ServerConfig {
  port: number;
}

interface GlobalConfig {
  server: ServerConfig;
}

export const configuration: GlobalConfig = {
  server: {
    port: Number(process.env.PORT) || 3000,
  },
};
