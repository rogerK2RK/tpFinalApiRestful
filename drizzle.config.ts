import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();

console.log('🔍 DATABASE_URL =', process.env.DATABASE_URL);

export default defineConfig({
  schema: './src/models',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
