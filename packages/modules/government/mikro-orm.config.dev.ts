import { defineConfig } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

export default defineConfig({
  driver: PostgreSqlDriver,
  dbName: 'mercur_dev',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  entities: ['./src/models/*.ts'],
  entitiesTs: ['./src/models/*.ts'],
  migrations: {
    path: './src/migrations',
    pathTs: './src/migrations',
  },
})
