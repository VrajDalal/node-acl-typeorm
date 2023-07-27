"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datasource = void 0;
const typeorm_1 = require("typeorm");
exports.datasource = new typeorm_1.DataSource({
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
