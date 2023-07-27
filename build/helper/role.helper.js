"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const datasource_1 = require("../core/datasource");
const role_entity_1 = require("../entity/role.entity");
const permission_entity_1 = require("../entity/permission.entity");
class UserRole {
}
exports.UserRole = UserRole;
_a = UserRole;
UserRole.getRoles = async () => {
    const role = await datasource_1.datasource.getRepository(role_entity_1.Roles).find({
        relations: {
            permission: true
        }
    });
    return role;
};
UserRole.getRolesById = async (requestParam, res) => {
    try {
        const role = await datasource_1.datasource.getRepository(role_entity_1.Roles).find({
            relations: {
                permission: true
            }, where: {
                id: requestParam.id
            }
        });
        // const role = await datasource.getRepository(Roles).findOneBy({ id: requestParam.id })
        if (role) {
            return role;
        }
        else {
            return {
                message: `user id ${requestParam.id} not exists`
            };
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
};
UserRole.createRole = async (requestParam, res) => {
    try {
        const newPermissions = [];
        // console.log(requestParam.permissions)
        for (let i = 0; i < requestParam.permissions.length; i++) {
            const permission = await datasource_1.datasource.getRepository(permission_entity_1.Permissions).findOneBy({ id: requestParam.permissions[i] });
            if (!permission) {
                return {
                    message: 'Invalid Permisssion'
                };
            }
            newPermissions.push(permission);
        }
        const rolePayload = Object.assign(Object.assign({}, requestParam), { permission: newPermissions });
        const role = await datasource_1.datasource.getRepository(role_entity_1.Roles).create(rolePayload);
        const result = await datasource_1.datasource.getRepository(role_entity_1.Roles).save(role);
        return result;
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
};
UserRole.updateRole = async (requestParam, res) => {
    try {
        const role = await datasource_1.datasource.getRepository(role_entity_1.Roles).findOneBy({
            id: requestParam.id
        });
        if (role) {
            // delete requestParam.id
            datasource_1.datasource.getRepository(role_entity_1.Roles).merge(role, requestParam);
            const result = await datasource_1.datasource.getRepository(role_entity_1.Roles).save(role);
            return result;
        }
        else {
            return {
                message: `user id ${requestParam.id} not exists`
            };
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
};
UserRole.deleteRole = async (requestParams, res) => {
    try {
        const role = await datasource_1.datasource.getRepository(role_entity_1.Roles).delete({ id: requestParams.id });
        if (role.affected === 0) {
            return {
                message: 'role not found'
            };
        }
        else {
            return {
                message: `role ${requestParams.id} deleted successfully`
            };
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            stack: err.stac
        });
    }
};
