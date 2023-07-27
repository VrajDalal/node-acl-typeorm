"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const datasource_1 = require("../core/datasource");
const user_entity_1 = require("../entity/user.entity");
class authHelper {
}
exports.authHelper = authHelper;
_a = authHelper;
authHelper.loginUser = async (payload, res) => {
    try {
        const users = await datasource_1.datasource.getRepository(user_entity_1.User).find({
            relations: {
                roles: true
            }
        });
        const email = payload.email;
        const password = payload.password;
        // console.log(email);
        const found = users.find((datas) => email === datas.email && password === datas.password);
        // console.log(found);
        if (found) {
            const jwtToken = jsonwebtoken_1.default.sign({ found }, 'secretkey', { expiresIn: '60d' });
            const userData = {
                jwt: jwtToken,
                users: found
            };
            return userData;
        }
        else {
            return {
                message: 'invalid email_id or password'
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
authHelper.forgetPassword = async (payload, res) => {
    try {
        const users = await datasource_1.datasource.getRepository(user_entity_1.User).find({});
        const email = payload.email;
        const forget = users.find((datas) => email === datas.email);
        // console.log(req.body.email);
        // console.log(payload.email)
        if (forget) {
            return {
                message: 'forget password reset link sent to your email_id'
            };
        }
        else {
            return {
                message: 'invalid email_id'
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
authHelper.registerUser = async (payload, res) => {
    try {
        console.log(payload);
        const userData = await datasource_1.datasource.getRepository(user_entity_1.User).findOneBy({ email: payload.email });
        console.log(userData);
        if (userData) {
            return {
                message: 'Email already exists!',
            };
        }
        // const existingRole = await roleRepository.findOneBy({
        //     id: payload.roles,
        // });
        // if (!existingRole) {
        //     return {
        //         message: 'Invalid Role!',
        //     };
        // }
        // console.log(existingRole);
        // delete payload.roles;
        // const userPayload: any = {
        //     ...payload,
        //     roles: existingRole,
        // };
        // console.log(userPayload);
        const createUser = await datasource_1.datasource.getRepository(user_entity_1.User).create(payload);
        const result = await datasource_1.datasource.getRepository(user_entity_1.User).save(createUser);
        return result;
    }
    catch (err) {
        return {
            message: err.message,
            stack: err.stack,
        };
    }
};
