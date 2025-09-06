import { defineConfig } from '@mikro-orm/postgresql'

export default defineConfig({
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  user: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'postgres',
  dbName: process.env.POSTGRES_DB ?? 'mercur',
  entities: ['dist/**/*.js'],
  entitiesTs: ['src/**/*.ts'],
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: 'src/migrations'
  }
})
