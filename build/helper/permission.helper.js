"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermission = void 0;
const datasource_1 = require("../core/datasource");
const permission_entity_1 = require("../entity/permission.entity");
class UserPermission {
}
exports.UserPermission = UserPermission;
_a = UserPermission;
UserPermission.getPermissions = async (requestParam) => {
    const permission = await datasource_1.datasource.getRepository(permission_entity_1.Permissions).find({});
    return permission;
};
UserPermission.getPermissionById = async (requestParam, res) => {
    try {
        const permission = await datasource_1.datasource.getRepository(permission_entity_1.Permissions).findOneBy({ id: requestParam.id });
        if (permission) {
            return permission;
        }
        else {
            return `user id ${requestParam.id} not exists`;
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
};
UserPermission.createPermissions = async (requestParam, res) => {
    try {
        const permission = await datasource_1.datasource.getRepository(permission_entity_1.Permissions).findOneBy({ name: requestParam.name });
        // console.log(permission)
        if (permission) {
            return {
                messgae: 'permission already exists'
            };
        }
        else {
            const permission = await datasource_1.datasource.getRepository(permission_entity_1.Permissions).create(requestParam);
            const result = await datasource_1.datasource.getRepository(permission_entity_1.Permissions).save(permission);
            // console.log(result)
            return result;
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
};
UserPermission.updatePermission = async (requestParam, res) => {
    try {
        const permission = await datasource_1.datasource.getRepository(permission_entity_1.Permissions).findOneBy({ id: requestParam.id });
        if (permission) {
            delete requestParam.id;
            datasource_1.datasource.getRepository(permission_entity_1.Permissions).merge(permission, requestParam);
            const result = await datasource_1.datasource.getRepository(permission_entity_1.Permissions).save(permission);
            return result;
        }
        else {
            return {
                mesasge: `user id ${requestParam.id} not exists`
            };
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            stacl: err.stack
        });
    }
};
UserPermission.deletePermission = async (requestParam, res) => {
    try {
        const permission = await datasource_1.datasource.getRepository(permission_entity_1.Permissions).delete(requestParam);
        if (permission.affected == 0) {
            return {
                message: `permission ${requestParam.id} not found`
            };
        }
        else {
            return {
                message: `permission ${requestParam.id} deleted successfully`
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
