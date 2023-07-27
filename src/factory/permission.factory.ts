import { setSeederFactory } from "typeorm-extension";
import { Permissions } from "../entity/permission.entity";

export const PermissionFactory = setSeederFactory(Permissions, () => {
    const permission = new Permissions()
    permission.name = "create_user", "update_user", "view_users", "view_single_user", "delete_user"
    return permission
})