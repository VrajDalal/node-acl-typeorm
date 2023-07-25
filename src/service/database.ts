import { DataSourceOptions, DataSource } from 'typeorm';
import { createDatabase } from 'typeorm-extension';
import { datasource } from '../core/datasource';

export class DatabaseService {
  static dataSource() {
    throw new Error('Method not implemented.');
  }
  public static async connectDatabase(): Promise<any> {
    const options: DataSourceOptions = {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    };
    await createDatabase({
      ifNotExist: true,
      options,
    });

    return await datasource.initialize();
  }
}
