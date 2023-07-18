import { DataSourceOptions, DataSource } from "typeorm"
import { createDatabase } from "typeorm-extension"
import { datasource } from "../core/datasource"

export class DatabaseService {
    static dataSource() {
        throw new Error("Method not implemented.")
    }
    public static async connectDatabase(): Promise<any> {
        const options: DataSourceOptions = {
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "my_api_data"
        }

        await createDatabase({
            ifNotExist: true, options
        })

        return await datasource.initialize()
    }

}

