"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("../core/route");
const auth_1 = require("../handler/auth");
const user_1 = require("../handler/user");
const express_1 = require("express");
const auth_2 = require("../utils/auth");
const auth_schema_1 = require("../validation-schemas/auth.schema");
const user_schema_1 = require("../validation-schemas/user.schema");
const role_1 = require("../handler/role");
const permission_1 = require("../handler/permission");
const enum_1 = require("../utils/enum");
const role_schema_1 = require("../validation-schemas/role.schema");
const router = (0, express_1.Router)();
//user  routes
router.get(route_1.apiEndPoint.user, [auth_2.Auth.is(enum_1.ROLE.VIEW_USERS)], async (req, res, next) => {
    await (0, user_1.getUsersList)(req, res, next);
});
router.get(route_1.apiEndPoint.userById, [auth_2.Auth.is(enum_1.ROLE.VIEW_USER_BY_ID), auth_2.Auth.validateSchema(user_schema_1.GetUserById)], async (req, res, next) => {
    await (0, user_1.getUserById)(req, res, next); //FIXME:: Add validation here
});
router.post(route_1.apiEndPoint.register, auth_2.Auth.validateSchema(auth_schema_1.RegisterSchema), async (req, res, next) => {
    await (0, auth_1.registerUserData)(req, res, next);
});
router.post(route_1.apiEndPoint.login, auth_2.Auth.validateSchema(auth_schema_1.LoginSchema), async (req, res, next) => {
    await (0, auth_1.loginUserData)(req, res, next);
});
router.post(route_1.apiEndPoint.forget, auth_2.Auth.validateSchema(auth_schema_1.ForgetPasswordSchema), async (req, res, next) => {
    await (0, auth_1.forgetPasswordData)(req, res, next);
});
router.post(route_1.apiEndPoint.user, [auth_2.Auth.is(enum_1.ROLE.CREATE_USER), auth_2.Auth.validateSchema(user_schema_1.CreaterUserSchema)], async (req, res, next) => {
    await (0, user_1.createUserData)(req, res, next); //FIXME:: Add validation here//
});
router.put(route_1.apiEndPoint.userById, [auth_2.Auth.is(enum_1.ROLE.UPDATE_USER), auth_2.Auth.validateSchema(user_schema_1.UpdateUserSchema)], async (req, res, next) => {
    await (0, user_1.updateUserData)(req, res, next); //FIXME:: Add validation here
});
router.delete(route_1.apiEndPoint.userById, [auth_2.Auth.is(enum_1.ROLE.DELETE_USER), auth_2.Auth.validateSchema(user_schema_1.DeleteUserSchema)], async (req, res, next) => {
    await (0, user_1.deleteUserData)(req, res, next);
});
//role routes
router.get(route_1.apiEndPoint.role, [auth_2.Auth.is(enum_1.ROLE.VIEW_ROLES)], async (req, res, next) => {
    await (0, role_1.getRoleData)(req, res, next);
});
router.get(route_1.apiEndPoint.roleById, [auth_2.Auth.is(enum_1.ROLE.VIEW_ROLE_BY_ID), auth_2.Auth.validateSchema(role_schema_1.GetRolesById)], async (req, res, next) => {
    await (0, role_1.getRoleIdData)(req, res, next);
});
router.post(route_1.apiEndPoint.role, async (req, res, next) => {
    await (0, role_1.createRoleData)(req, res, next);
});
router.put(route_1.apiEndPoint.roleById, [auth_2.Auth.is(enum_1.ROLE.UPDATE_ROLE), auth_2.Auth.validateSchema(role_schema_1.UpdateRoleSchema)], async (req, res, next) => {
    await (0, role_1.updateRoleById)(req, res, next);
});
router.delete(route_1.apiEndPoint.roleById, [auth_2.Auth.is(enum_1.ROLE.DELETE_ROLE), auth_2.Auth.validateSchema(role_schema_1.DeleteRoleSchema)], async (req, res, next) => {
    await (0, role_1.deleteRoleById)(req, res, next);
});
//permission routes
router.get(route_1.apiEndPoint.permissions, async (req, res, next) => {
    await (0, permission_1.getPermissionsData)(req, res, next);
});
router.get(route_1.apiEndPoint.permissionById, async (req, res, next) => {
    await (0, permission_1.getPermissionByIdData)(req, res, next);
});
router.post(route_1.apiEndPoint.permissions, async (req, res, next) => {
    await (0, permission_1.createPermissionData)(req, res, next);
});
router.put(route_1.apiEndPoint.permissionById, async (req, res, next) => {
    await (0, permission_1.updatePermissionData)(req, res, next);
});
router.delete(route_1.apiEndPoint.permissionById, async (req, res, next) => {
    await (0, permission_1.deletePermissionData)(req, res, next);
});
exports.default = router;
