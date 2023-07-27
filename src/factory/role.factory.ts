import { setSeederFactory } from "typeorm-extension"
import { Roles } from "../entity/role.entity"

export const RolesFactory = setSeederFactory(Roles, async () => {
    const roles = new Roles()
    roles.name = "Dummy User"
    return roles
})
