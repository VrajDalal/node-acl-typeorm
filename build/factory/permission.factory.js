"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionFactory = void 0;
const typeorm_extension_1 = require("typeorm-extension");
const permission_entity_1 = require("../entity/permission.entity");
exports.PermissionFactory = (0, typeorm_extension_1.setSeederFactory)(permission_entity_1.Permissions, () => {
    const permission = new permission_entity_1.Permissions();
    permission.name = "create_user", "update_user", "view_users", "view_single_user", "delete_user";
    return permission;
});
