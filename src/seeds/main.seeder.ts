import { DataSource } from "typeorm"
import { Seeder, SeederFactoryManager } from "typeorm-extension"
import { User } from "../entity/user.entity"
import { Roles } from "../entity/role.entity"
import { Permissions } from "../entity/permission.entity"

export class MainSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        console.log("caleed")
        const permissions = [
            {
                name: "create_user(dummy)"
            }, {
                name: "update_user(dummy)"
            }, {
                name: "view_users(dummy)"
            }, {
                name: "view_single_user(dummy)"
            }, {
                name: "delete_user(dummy)"
            }
        ]

        const storePermission = await dataSource.getRepository(Permissions).create(permissions)
        const permissionResult = await dataSource.getRepository(Permissions).save(storePermission)

        const role: any = {
            name: "Dummy User",
            permission: permissionResult
        }

        const storeRoles = await dataSource.getRepository(Roles).create(role)
        const roleResult = await dataSource.getRepository(Roles).save(storeRoles)

        const user: any = {
            name: "Dummy",
            email: "dummy@gmail.com",
            password: "dummy@123",
            mobile_no: 9876543210,
            roles: roleResult
        }

        const storeUser = await dataSource.getRepository(User).create(user)
        await dataSource.getRepository(User).save(storeUser)

        // const roles = await roleFactory.saveMany(2)
        // const users = await userFactory.saveMany(2)
        // const permissions = await permissionFactory.saveMany(2)
        // console.log(permissionFactory)
        // console.log(roles)
        // console.log(users)

    }
}