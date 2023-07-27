"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const typeorm_extension_1 = require("typeorm-extension");
const datasource_1 = require("../core/datasource");
class DatabaseService {
    static dataSource() {
        throw new Error('Method not implemented.');
    }
    static async connectDatabase() {
        const options = {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            factories: ['src/factory/*.ts'],
            seeds: ['src/seeds/*.ts'],
            extra: {
                ssl: {
                    rejectUnauthorized: false
                }
            }
        };
        await (0, typeorm_extension_1.createDatabase)({
            ifNotExist: true,
            options,
        });
        return await datasource_1.datasource.initialize().then(async () => {
            await datasource_1.datasource.synchronize(true);
            await (0, typeorm_extension_1.runSeeders)(datasource_1.datasource);
            process.exit();
        });
    }
}
exports.DatabaseService = DatabaseService;
