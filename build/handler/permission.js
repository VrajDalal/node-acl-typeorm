"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePermissionData = exports.updatePermissionData = exports.createPermissionData = exports.getPermissionByIdData = exports.getPermissionsData = void 0;
const permission_helper_1 = require("../helper/permission.helper");
const auth_1 = require("../utils/auth");
const getPermissionsData = async (req, res, next) => {
    const reqParams = auth_1.Auth.getRequestParams(req);
    const result = await permission_helper_1.UserPermission.getPermissions(reqParams);
    return res.status(200).json({ body: result });
};
exports.getPermissionsData = getPermissionsData;
const getPermissionByIdData = async (req, res, next) => {
    const reqParams = auth_1.Auth.getRequestParams(req);
    const result = await permission_helper_1.UserPermission.getPermissionById(reqParams, res);
    return res.status(200).json({ body: result });
};
exports.getPermissionByIdData = getPermissionByIdData;
const createPermissionData = async (req, res, next) => {
    const reqParams = auth_1.Auth.getRequestParams(req);
    const result = await permission_helper_1.UserPermission.createPermissions(reqParams, res);
    return res.status(200).json({ body: result });
};
exports.createPermissionData = createPermissionData;
const updatePermissionData = async (req, res, next) => {
    const reqParams = auth_1.Auth.getRequestParams(req);
    const result = await permission_helper_1.UserPermission.updatePermission(reqParams, res);
    return res.status(200).json({ body: result });
};
exports.updatePermissionData = updatePermissionData;
const deletePermissionData = async (req, res, next) => {
    const reqParams = auth_1.Auth.getRequestParams(req);
    const result = await permission_helper_1.UserPermission.deletePermission(reqParams, res);
    return res.status(500).json({ body: result });
};
exports.deletePermissionData = deletePermissionData;
