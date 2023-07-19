import express, { Express, response } from 'express';
import router from './routes';
import { DatabaseService } from './service/database';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });

DatabaseService.connectDatabase().then((res) =>
  console.log('Database connected successfully')
);

const app: Express = express();
const port = process.env.PORT || 9090;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(port, () => {
  console.log(`${port} successfully started`);
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
