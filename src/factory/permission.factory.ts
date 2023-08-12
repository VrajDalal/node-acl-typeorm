import { setSeederFactory } from "typeorm-extension";
import { Permissions } from "../entity/permission.entity";

export const PermissionFactory = setSeederFactory(Permissions, () => {
    const permission = new Permissions()
    permission.name = "create_user"
    return permission
})