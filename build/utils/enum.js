"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE = void 0;
var ROLE;
(function (ROLE) {
    //USERS
    ROLE["CREATE_USER"] = "create_user";
    ROLE["UPDATE_USER"] = "update_user";
    ROLE["VIEW_USERS"] = "view_users";
    ROLE["VIEW_USER_BY_ID"] = "view_single_user";
    ROLE["DELETE_USER"] = "delete_user";
    //ROLES
    ROLE["CREATE_ROLE"] = "create_role";
    ROLE["UPDATE_ROLE"] = "update_role";
    ROLE["VIEW_ROLES"] = "view_roles";
    ROLE["VIEW_ROLE_BY_ID"] = "view_single_role";
    ROLE["DELETE_ROLE"] = "delete_role";
    //PERMISSIONS
    ROLE["CREATE_PERMISSION"] = "create_permission";
    ROLE["UPDATE_PERMISSION"] = "update_permission";
    ROLE["VIEW_PERMISSIONS"] = "view_permissions";
    ROLE["VIEW_PERMISSION_BY_ID"] = "view_single_permission";
    ROLE["DELETE_PERMISSION"] = "delete_permission";
})(ROLE || (exports.ROLE = ROLE = {}));
