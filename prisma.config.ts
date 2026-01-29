import 'dotenv/config'
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'npx tsx prisma/seed.ts'
  },
  datasource: {
    // Para o Migrate funcionar na v7, o config precisa da URL aqui
    url: process.env.DATABASE_URL, 
  },
});