import dotenv from 'dotenv';

dotenv.config();

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        [key: string]: string | undefined;
        PORT: string;
        DATABASE_URL: string;
        CLOUD_NAME: string;
        API_KEY: string;
        API_SECRET: string;
      }
    }
  }
