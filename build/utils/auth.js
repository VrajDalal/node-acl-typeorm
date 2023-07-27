"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const fastest_validator_1 = __importDefault(require("fastest-validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const datasource_1 = require("../core/datasource");
const role_entity_1 = require("../entity/role.entity");
const app_error_1 = __importDefault(require("./app_error"));
class Auth {
    //middleware
    static validateSchema(reqSchema = {}) {
        const v = new fastest_validator_1.default();
        return (req, res, next) => {
            const validate = v.compile(reqSchema);
            const validateResponce = validate(Object.assign({}, this.getRequestParams(req)));
            if (validateResponce == true) {
                next();
            }
            else {
                const error = validateResponce;
                res.status(400).json({
                    code: 400,
                    message: 'Invalide Request Paramas',
                    type: 'E_BAD_REQUEST_PARAMS',
                    error: error,
                });
            }
        };
    }
    static is(requiredPermission) {
        const authorizedRole = async (req, res, next) => {
            try {
                const headerAuth = req.headers.authorization;
                if (!headerAuth) {
                    return next(new app_error_1.default(401, 'You are not logged in'));
                }
                const replaceHeaders = headerAuth.replace('Bearer ', '');
                const decoded = jsonwebtoken_1.default.decode(replaceHeaders);
                if (!decoded) {
                    return next(new app_error_1.default(401, `Invalid token or user doesn't exist`));
                }
                const roleId = decoded.found.roles.id;
                const roleFind = await datasource_1.datasource.getRepository(role_entity_1.Roles).findOne({
                    relations: {
                        permission: true,
                    },
                    where: {
                        id: roleId,
                    },
                });
                if (roleFind) {
                    const findPermission = roleFind.permission.some((permission) => permission.name === requiredPermission);
                    if (findPermission) {
                        next();
                    }
                    else {
                        return next(new app_error_1.default(401, `You don't have permission`));
                    }
                }
                else {
                    return next(new app_error_1.default(401, `Invalid role`));
                }
            }
            catch (error) {
                next(error);
            }
        };
        return authorizedRole;
    }
}
exports.Auth = Auth;
_a = Auth;
Auth.getRequestParams = (req) => {
    const { body, query, params } = req;
    return Object.assign(Object.assign(Object.assign({}, body), query), params);
};
//guard
Auth.validateRole = async (req, res, next, requiredPermission) => {
    try {
        const headerAuth = req.headers.authorization;
        if (!headerAuth) {
            return next(new app_error_1.default(401, 'You are not logged in'));
        }
        console.log('called');
        const replaceHeaders = headerAuth.replace('Bearer ', '');
        const decoded = jsonwebtoken_1.default.decode(replaceHeaders);
        if (!decoded) {
            return next(new app_error_1.default(401, `Invalid token or user doesn't exist`));
        }
        const roleId = decoded.found.roles.id;
        const roleFind = await datasource_1.datasource.getRepository(role_entity_1.Roles).findOne({
            relations: {
                permission: true,
            },
            where: {
                id: roleId,
            },
        });
        if (roleFind) {
            const findPermission = roleFind.permission.some((permission) => permission.name === requiredPermission);
            if (findPermission) {
                next();
            }
            else {
                return next(new app_error_1.default(401, `You don't have permission`));
            }
        }
        else {
            return next(new app_error_1.default(401, `Invalid role`));
        }
    }
    catch (error) {
        next(error);
    }
};
