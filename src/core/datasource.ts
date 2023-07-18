import { DataSource } from "typeorm";

export const datasource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "my_api_data",
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
    migrationsRun: true,
    migrationsTableName: "custom_migration_table",
})