import { NextFunction, Request, Response } from 'express';
import Validator, { ValidationError } from 'fastest-validator';
import Jwt from 'jsonwebtoken';
import { datasource } from '../core/datasource';
import { Roles } from '../entity/role.entity';

export class Auth {

  public static getRequestParams = (req: Request) => {
    const { body, query, params } = req;
    return { ...body, ...query, ...params };
  };
  //middleware
  public static validateSchema(reqSchema: any = {}):
    (req: Request, res: Response, next: NextFunction) => void {
    const v: Validator = new Validator();
    return (req: Request, res: Response, next: NextFunction) => {
      const validate = v.compile(reqSchema);
      const validateResponce = validate(req.body);
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

  public static validateRole = async (req: Request, res: Response, next: NextFunction, requiredPermission: string) => {
    //Get JWT From Headers
    //check null or not if not than replace bearer with blank string
    const headerAuth = req.headers.authorization;
    // console.log(headerAuth);
    if (!headerAuth) {
      return res.status(400).json({
        message: 'invalid token',
      });
    }
    const replaceHeaders = headerAuth.replace('Bearer ', '');
    // console.log(replaceHeaders)
    //Decode JWT => from USER DATA
    const decoded: any = Jwt.decode(replaceHeaders);
    // console.log(decoded)
    const roleId = decoded.found.roles.id;
    // console.log(roleId);
    //Find Role from role table -> Invalid Role
    try {
      const roleFind = await datasource.getRepository(Roles).findOne({
        relations: {
          permission: true,
        },
        where: {
          id: roleId,
        },
      });
      // console.log(roleFind);
      // const found = roleFind.find((role:any) => decodedRole === roleFinder)
      if (roleFind) {
        const findPermission = roleFind.permission.some(
          (permission: any) => permission.name === requiredPermission
        );
        // console.log(findPermission);
        if (findPermission) {
          (next)
        } else {
          res.status(403).json({
            code: 403,
            message: "You don't have enough permission",
          });
        }
      } else {
        res.status(403).json({
          code: 403,
          message: 'Invalid Role',
        });
      }
    } catch (error: any) {
      res.status(500).json({
        code: 500,
        message: error.message,
        stack: error.stack,
        error: error,
      });
    }
  };

  public static defaultUser = async (req: Request, res: Response, next: NextFunction, requiredPermission: string) => {
  }
}