"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesFactory = void 0;
const typeorm_extension_1 = require("typeorm-extension");
const role_entity_1 = require("../entity/role.entity");
exports.RolesFactory = (0, typeorm_extension_1.setSeederFactory)(role_entity_1.Roles, async () => {
    const roles = new role_entity_1.Roles();
    roles.name = "Dummy User";
    return roles;
});
