import { NextFunction, Request, Response } from 'express';
import Validator, { ValidationError } from 'fastest-validator';
import Jwt from 'jsonwebtoken';
import { datasource } from '../core/datasource';
import { Roles } from '../entity/role.entity';
import AppError from './app_error';
import { decode } from 'punycode';
import { User } from '../entity/user.entity';
import { FileOptions } from 'buffer';

export class Auth {
  public static getRequestParams = (req: Request) => {
    const { body, query, params,files } = req;
    return { ...body, ...query, ...params,...files };
  };
  //middleware
  public static validateSchema(
    reqSchema: any = {}
  ): (req: Request, res: Response, next: NextFunction) => void {
    const v: Validator = new Validator();
    return (req: Request, res: Response, next: NextFunction) => {
      const validate = v.compile(reqSchema);
      const validateResponce = validate({ ...this.getRequestParams(req) });
      if (validateResponce == true) {
        next();
      } else {
        const error = validateResponce as ValidationError[];
        res.status(400).json({
          code: 400,
          message: 'Invalide Request Paramas',
          type: 'E_BAD_REQUEST_PARAMS',
          error: error,
        });
      }
    };
  }
  //guard

  // public static validateRole = async (req: Request, res: Response, next: NextFunction, requiredPermission: string) => {
  //   try {
  //     const headerAuth = req.headers.authorization;
  //     if (!headerAuth) {
  //       return next(new AppError(401, 'You are not logged in'));
  //     }
  //     console.log('called');
  //     const replaceHeaders = headerAuth.replace('Bearer ', '');
  //     const decoded: any = Jwt.decode(replaceHeaders);

  //     if (!decoded) {
  //       return next(new AppError(401, `Invalid token or user doesn't exist`));
  //     }

  //     const roleId = decoded.found.roles.id;

  //     const roleFind = await datasource.getRepository(Roles).findOne({
  //       relations: {
  //         permission: true,
  //       },
  //       where: {
  //         id: roleId,
  //       },
  //     });
  //     if (roleFind) {
  //       const findPermission = roleFind.permission.some(
  //         (permission: any) => permission.name === requiredPermission
  //       );
  //       if (findPermission) {
  //         next();
  //       } else {
  //         return next(new AppError(401, `You don't have permission`));
  //       }
  //     } else {
  //       return next(new AppError(401, `Invalid role`));
  //     }
  //   } catch (error: any) {
  //     next(error);
  //   }
  // };

  public static is(requiredPermission: string) {
    const authorizedRole = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const headerAuth = req.headers.authorization;
        if (!headerAuth) {
          return next(new AppError(401, 'You are not logged in'));
        }
        const replaceHeaders = headerAuth.replace('Bearer ', '');
        const decoded: any = Jwt.decode(replaceHeaders);

        if (!decoded) {
          return next(new AppError(401, `Invalid token or user doesn't exist`));
        }

        const roleId = decoded.userObject.roles.id;

        const roleFind = await datasource.getRepository(Roles).findOne({
          relations: {
            permission: true,
          },
          where: {
            id: roleId,
          },
        });
        if (roleFind) {
          const findPermission = roleFind.permission.some(
            (permission: any) => permission.name === requiredPermission
          );
          if (findPermission) {
            next();
          } else {
            return next(new AppError(401, `You don't have permission`));
          }
        } else {
          return next(new AppError(401, `Invalid role`));
        }
      } catch (error: any) {
        next(error);
      }
    };
    return authorizedRole;
  }

  // public static async NotDelete(req: Request, res: Response, next: NextFunction) {

  //   try {
  //     const headerAuth: any = req.headers.authorization;
  //     if (!headerAuth) {
  //       return next(new AppError(401, 'You are not logged in'));
  //     }
  //     const replaceHeader = headerAuth.replace('Bearer ', '')
  //     // console.log(replaceHeader)
  //     const decoded: any = Jwt.decode(replaceHeader)
  //     if (!decoded) {
  //       return next(new AppError(401, `Invalid token or user doesn't exist`));
  //     }

  //     const userID = decoded.userObject.id
  //     console.log(userID)
  //     const user = await datasource.getRepository(User).findOneBy({ id: req.params.id })
  //     console.log(user)
  //     if (userID == user) {
  //       return {
  //         message: 'You can not delete your own profile'
  //       }
  //     } else {
  //       return {
  //         message: `user ${req.params.id} deleted successfully`
  //       }
  //     }
  //   } catch (err: any) {
  //     return {
  //       message: err.message,
  //       stack: err.stack
  //     }
  //   }
  // }
}
