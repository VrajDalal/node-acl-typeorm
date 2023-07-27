"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRoleSchema = exports.UpdateRoleSchema = exports.GetRolesById = exports.CreateRoleSchema = void 0;
exports.CreateRoleSchema = {
    name: { type: "string", empty: false, trim: true },
    permission: { type: "array", empty: false, trim: true }
};
exports.GetRolesById = {
    id: { type: "string", empty: false, trim: true }
};
exports.UpdateRoleSchema = {
    name: { type: "string", empty: false, trim: true }
};
exports.DeleteRoleSchema = {
    id: { type: "string", empty: false, trim: true }
};
