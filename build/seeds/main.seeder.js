"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainSeeder = void 0;
const user_entity_1 = require("../entity/user.entity");
const role_entity_1 = require("../entity/role.entity");
const permission_entity_1 = require("../entity/permission.entity");
class MainSeeder {
    async run(dataSource, factoryManager) {
        const permissionFactory = factoryManager.get(permission_entity_1.Permissions);
        const roleFactory = factoryManager.get(role_entity_1.Roles);
        const userFactory = factoryManager.get(user_entity_1.User);
        const roles = await roleFactory.saveMany(1);
        const users = await userFactory.saveMany(1);
        const permissions = await permissionFactory.saveMany(1);
    }
}
exports.MainSeeder = MainSeeder;
