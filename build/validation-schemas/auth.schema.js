"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordSchema = exports.LoginSchema = exports.RegisterSchema = void 0;
exports.RegisterSchema = {
    name: { type: "string", empty: false, trim: true },
    email: { type: 'string', lowercase: true, empty: false, trim: true },
    password: { type: 'string', empty: false },
    mobile_no: { type: 'number', empty: true, optional: true },
    address: { type: 'object', empty: true, optional: true }
};
exports.LoginSchema = {
    email: { type: 'string', lowercase: true, empty: false, trim: true },
    password: { type: 'string', empty: false }
};
exports.ForgetPasswordSchema = {
    email: { type: 'string', lowercase: true, empty: false, trim: true }
};
