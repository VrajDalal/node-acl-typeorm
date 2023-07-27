import { DataSource } from 'typeorm';
import seeds from 'typeorm-extension';

export const datasource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'api_dev',
  synchronize: true,
  logging: false,
  entities: ['src/entity/*.ts'],
  migrations: ['src/migration/*.ts'],
  migrationsRun: true,
  migrationsTableName: 'custom_migration_table',
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
});
