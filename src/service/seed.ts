import { DataSourceOptions, DataSource } from 'typeorm';
import { SeederOptions, createDatabase, runSeeders } from 'typeorm-extension';
import { datasource } from '../core/datasource';
import { UserFactory } from '../factory/user.factory';
import { RolesFactory } from '../factory/role.factory';
import { PermissionFactory } from '../factory/permission.factory';
import { MainSeeder } from '../seeds/main.seeder';

export class DatabaseService {
    static dataSource() {
        throw new Error('Method not implemented.');
    }
    public static async connectDatabase(): Promise<any> {
        const options: DataSourceOptions & SeederOptions = {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT!),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            factories: [PermissionFactory, RolesFactory, UserFactory],
            seeds: [MainSeeder],
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

        return await datasource.initialize().then(async () => {
            await datasource.synchronize(true);
            await runSeeders(datasource);
            process.exit();
        });
    }
}
