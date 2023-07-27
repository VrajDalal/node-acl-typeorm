"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHelper = void 0;
const user_entity_1 = require("../entity/user.entity");
const role_entity_1 = require("../entity/role.entity");
const datasource_1 = require("../core/datasource");
//create new user
class userHelper {
}
exports.userHelper = userHelper;
_a = userHelper;
userHelper.getUsers = async () => {
    const user = await datasource_1.datasource.getRepository(user_entity_1.User).find({ relations: { roles: true } });
    return user;
};
userHelper.getUser = async (requestParam, res) => {
    try {
        const user = await datasource_1.datasource.getRepository(user_entity_1.User).findOneBy({ id: requestParam.userId });
        console.log(user);
        if (user) {
            return user;
        }
        else {
            return {
                message: `user id ${requestParam.userId} is not exists`
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
userHelper.createUser = async (payload) => {
    const userRepository = await datasource_1.datasource.getRepository(user_entity_1.User);
    const roleRepository = await datasource_1.datasource.getRepository(role_entity_1.Roles);
    try {
        const userData = await userRepository.findOneBy({ email: payload.email });
        // console.log(userData)
        if (userData) {
            return {
                message: 'Email already exists!',
            };
        }
        const existingRole = await roleRepository.findOneBy({
            id: payload.roles,
        });
        if (!existingRole) {
            return {
                message: 'Invalid Role!',
            };
        }
        // console.log(existingRole);
        delete payload.roles;
        const userPayload = Object.assign(Object.assign({}, payload), { roles: existingRole });
        // console.log(userPayload);
        const user = await userRepository.create(userPayload);
        const result = await userRepository.save(user);
        return result;
    }
    catch (err) {
        return {
            message: err.message,
            stack: err.stack,
        };
    }
};
userHelper.updateUser = async (requestParam, res) => {
    const user = await datasource_1.datasource.getRepository(user_entity_1.User).findOneBy({ id: requestParam.userId });
    // console.log(user)
    if (user) {
        datasource_1.datasource.getRepository(user_entity_1.User).merge(user, requestParam);
        // console.log(merger)
        const result = await datasource_1.datasource.getRepository(user_entity_1.User).save(user);
        // console.log(result)
        return result;
    }
    else {
        return {
            message: `user id ${requestParam.userId} incorrect`
        };
    }
};
userHelper.deleteUser = async (requestParam, res) => {
    const user = await datasource_1.datasource.getRepository(user_entity_1.User).findOneBy({
        id: requestParam.userId
    });
    if (user) {
        const userDelete = await datasource_1.datasource.getRepository(user_entity_1.User).delete(requestParam.userId);
        if (userDelete) {
            return {
                message: `user ${requestParam.userId} deleted successfully`
            };
        }
        else {
            return {
                message: `user id ${requestParam.userId} not found`,
            };
        }
    }
    else {
        return {
            message: `user id ${requestParam.userId} doesn't exist`
        };
    }
};
