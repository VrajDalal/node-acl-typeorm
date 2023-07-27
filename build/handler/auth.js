"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPasswordData = exports.registerUserData = exports.loginUserData = void 0;
const auth_helper_1 = require("../helper/auth.helper");
const auth_1 = require("../utils/auth");
const loginUserData = async (req, res, next) => {
    const payload = auth_1.Auth.getRequestParams(req);
    const result = await auth_helper_1.authHelper.loginUser(payload, res);
    return res.status(200).json({ body: result });
};
exports.loginUserData = loginUserData;
const registerUserData = async (req, res, next) => {
    const payload = auth_1.Auth.getRequestParams(req);
    const result = await auth_helper_1.authHelper.registerUser(payload, res);
    return res.status(200).json({ body: result });
};
exports.registerUserData = registerUserData;
const forgetPasswordData = async (req, res, next) => {
    const payload = auth_1.Auth.getRequestParams(req);
    const result = await auth_helper_1.authHelper.forgetPassword(payload, res);
    return res.status(200).json({ body: result });
};
exports.forgetPasswordData = forgetPasswordData;
