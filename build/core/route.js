"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiEndPoint = void 0;
const apiEndPoint = {
    user: '/users',
    userById: '/users/:userId',
    login: '/auth/local',
    register: '/auth/local/register',
    forget: '/forget',
    role: '/roles',
    roleById: '/roles/:id',
    permissions: '/permissions',
    permissionById: '/permissions/:id' //get //put //delete
};
exports.apiEndPoint = apiEndPoint;
