"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./service/database");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app_error_1 = __importDefault(require("./utils/app_error"));
const envPath = path_1.default.resolve(__dirname, '..', '.env');
dotenv_1.default.config({ path: envPath });
database_1.DatabaseService.connectDatabase().then((res) => {
    const app = (0, express_1.default)();
    const port = process.env.PORT || 9090;
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(routes_1.default);
    //static seeding
    // app.get('/dummy', async (req: Request, res: Response) => {
    //   const permissions = [
    //     {
    //       name: "create_user(dummy)"
    //     }, {
    //       name: "update_user(dummy)"
    //     }, {
    //       name: "view_users(dummy)"
    //     }, {
    //       name: "view_single_user(dummy)"
    //     }, {
    //       name: "delete_user(dummy)"
    //     }
    //   ]
    //   const storePermission = await datasource.getRepository(Permissions).create(permissions)
    //   const permissionResult = await datasource.getRepository(Permissions).save(storePermission)
    //   const role: any = {
    //     name: "Dummy User",
    //     permission: permissionResult
    //   }
    //   const storeRoles = await datasource.getRepository(Roles).create(role)
    //   const roleResult = await datasource.getRepository(Roles).save(storeRoles)
    //   const user: any = {
    //     name: "Dummy",
    //     email: "dummy@gmail.com",
    //     password: "dummy@123",
    //     mobile_no: 9876543210,
    //     roles: roleResult
    //   }
    //   const storeUser = await datasource.getRepository(User).create(user)
    //   const userResult = await datasource.getRepository(User).save(storeUser)
    //   res.status(200).json({
    //     permissionResult, roleResult, userResult
    //   })
    // })
    // UNHANDLED ROUTE
    app.all('*', (req, res, next) => {
        next(new app_error_1.default(404, `Route ${req.originalUrl} not found`));
    });
    // GLOBAL ERROR HANDLER
    app.use((error, req, res, next) => {
        error.status = error.status || 'error';
        error.statusCode = error.statusCode || 500;
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    });
    app.listen(port, () => {
        console.log(`${port} successfully started`);
    });
});
//List of user /users --> GET == done
//create user /users --> POST == done
//get user by id /users/:id --> GET  == done
// update user /users/:id  --> PUT == done
// delete user /users/:id    --> DELETE == done
//create middleware
//1.middleware
//2.gard
//3.interceptor
//4.pipe
//5.filter
//create table
//user
//role role_id,name
//1. superadmin: create,update,delete,alluser,alluserbyid
//2. admin: create,update,alluser
//3. manager: create
//permission  type: CREATE_USER = "create_user",
// UPDATE_USER = "update_user",
// VIEW_USERS = "view_users",
// VIEW_USER_BY_ID = "view_single_user",
// DELETE_USER = "delete_user"
//user table relation => ManyToOne with role table
//role table relation => OneToMany with user table
/*
1.create  all permission api
2. create,update,get,delete permission
3. role api merge
*/
//create by default user role in Auth
//create static seeder api for create dummy data in user,role,permission
