import express, {
  Express,
  NextFunction,
  Request,
  Response,
  response,
} from 'express';
import router from './routes';
import { DatabaseService } from './service/database';
import dotenv from 'dotenv';
import path from 'path';
import AppError from './utils/app_error';

const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });

DatabaseService.connectDatabase().then((res) => {
  const app: Express = express();
  const port = process.env.PORT || 9090;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(router);

  // UNHANDLED ROUTE
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.originalUrl} not found`));
  });

  // GLOBAL ERROR HANDLER
  app.use(
    (error: AppError, req: Request, res: Response, next: NextFunction) => {
      error.status = error.status || 'error';
      error.statusCode = error.statusCode || 500;

      res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
  );

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
