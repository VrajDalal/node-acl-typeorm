"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserData = exports.updateUserData = exports.createUserData = exports.getUserById = exports.getUsersList = void 0;
const user_helper_1 = require("../helper/user.helper");
const auth_1 = require("../utils/auth");
const getUsersList = async (req, res, next) => {
    const result = await user_helper_1.userHelper.getUsers();
    return res.status(200).json({ body: result });
};
exports.getUsersList = getUsersList;
const getUserById = async (req, res, next) => {
    const payload = auth_1.Auth.getRequestParams(req);
    const result = await user_helper_1.userHelper.getUser(payload, res);
    return res.status(200).json({ body: result });
};
exports.getUserById = getUserById;
const createUserData = async (req, res, next) => {
    const payload = auth_1.Auth.getRequestParams(req);
    const result = await user_helper_1.userHelper.createUser(payload);
    return res.status(200).json({ body: result });
};
exports.createUserData = createUserData;
const updateUserData = async (req, res, next) => {
    const payload = auth_1.Auth.getRequestParams(req); // && validateObjectId(payload.id)
    const result = await user_helper_1.userHelper.updateUser(payload, res);
    return res.status(200).json({ body: result });
};
exports.updateUserData = updateUserData;
const deleteUserData = async (req, res, next) => {
    const payload = auth_1.Auth.getRequestParams(req);
    const result = await user_helper_1.userHelper.deleteUser(payload, res);
    return res.status(200).json({ body: result });
};
exports.deleteUserData = deleteUserData;
