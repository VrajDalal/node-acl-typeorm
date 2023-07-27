"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleById = exports.updateRoleById = exports.createRoleData = exports.getRoleIdData = exports.getRoleData = void 0;
const role_helper_1 = require("../helper/role.helper");
const auth_1 = require("../utils/auth");
const getRoleData = async (req, res, next) => {
    const result = await role_helper_1.UserRole.getRoles();
    return res.status(200).json({ body: result });
};
exports.getRoleData = getRoleData;
const getRoleIdData = async (req, res, next) => {
    const reqParams = await auth_1.Auth.getRequestParams(req);
    const result = await role_helper_1.UserRole.getRolesById(reqParams, res);
    return res.status(200).json({ body: result });
};
exports.getRoleIdData = getRoleIdData;
const createRoleData = async (req, res, next) => {
    const reqParams = await auth_1.Auth.getRequestParams(req);
    const result = await role_helper_1.UserRole.createRole(reqParams, res);
    return res.status(200).json({ body: result });
};
exports.createRoleData = createRoleData;
const updateRoleById = async (req, res, next) => {
    const reqParams = await auth_1.Auth.getRequestParams(req);
    const result = await role_helper_1.UserRole.updateRole(reqParams, res);
    return res.status(200).json({ body: result });
};
exports.updateRoleById = updateRoleById;
const deleteRoleById = async (req, res, next) => {
    const reqParams = await auth_1.Auth.getRequestParams(req);
    const result = await role_helper_1.UserRole.deleteRole(reqParams, res);
    return res.status(200).json({ body: result });
};
exports.deleteRoleById = deleteRoleById;
