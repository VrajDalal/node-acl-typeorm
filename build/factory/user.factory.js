"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const typeorm_extension_1 = require("typeorm-extension");
const user_entity_1 = require("../entity/user.entity");
exports.UserFactory = (0, typeorm_extension_1.setSeederFactory)(user_entity_1.User, async () => {
    const user = new user_entity_1.User();
    user.name = "Dummy";
    user.email = "dummy@gmail.com";
    user.password = "dummy@123";
    user.mobile_no = 9658965895;
    return user;
});
