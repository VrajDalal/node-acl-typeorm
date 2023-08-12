import fs from "fs";
import { NextFunction, Request, Response } from "express";
import { ICreateUser, IDeleteUser, IGetUser, IUpdateUser, } from "../utils/interface/user.auth.interface";
import { User } from "../entity/user.entity";
import { Roles } from "../entity/role.entity";
import { datasource } from "../core/datasource";
import Jwt from "jsonwebtoken"
import AppError from "../utils/app_error";
import { decode } from "punycode";

//create new user
export class userHelper {
  public static getUsers = async () => {
    const user = await datasource.getRepository(User).find({
      relations: {
        roles: true
      }
    });
    return user;
  };

  public static getUser = async (requestParam: IGetUser, res: Response) => {
    try {
      const user = await datasource.getRepository(User).findOneBy({
        id: requestParam.userId
      });
      // console.log(user);
      if (user) {
        return user;
      } else {
        return {
          message: `user id ${requestParam.userId} is not exists`,
        }
      }
    } catch (err: any) {
      res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
    }
  };

  public static createUser = async (payload: ICreateUser) => {
    const userRepository = await datasource.getRepository(User);
    const roleRepository = await datasource.getRepository(Roles);
    try {
      const userData = await userRepository.findOneBy({ email: payload.email });
      // console.log(userData)
      if (userData) {
        return {
          message: "Email already exists!",
        };
      }
      const existingRole = await roleRepository.findOneBy({
        id: payload.roles,
      });
      if (!existingRole) {
        return {
          message: "Invalid Role!",
        };
      }
      // console.log(existingRole);
      delete payload.roles;
      const userPayload: any = {
        ...payload,
        roles: existingRole,
      };
      // console.log(userPayload);
      const user = await userRepository.create(userPayload);

      const result = await userRepository.save(user);
      return result;
    } catch (err: any) {
      return {
        message: err.message,
        stack: err.stack,
      };
    }
  };

  public static updateUser = async (requestParam: IUpdateUser, res: Response) => {
    try {
      const userData: any = await datasource.getRepository(User).findOneBy({
        id: requestParam.userId
      });
      const user = this.setUserData(requestParam, userData)
      if (user) {
        await datasource.getRepository(User).merge(userData, user);
        const result = await datasource.getRepository(User).save(userData);
        return result;
      } else {
        return {
          message: `user id ${requestParam.userId} incorrect`,
        };
      }
    } catch (err: any) {
      return {
        message: err.message,
        stack: err.stack,
      };
    }
  }

  public static deleteUser = async (req: Request, requestParam: IDeleteUser, res: Response, next: NextFunction) => {
    try {
      const headerAuth = req.headers.authorization
      if (!headerAuth) {
        return next(new AppError(401, 'you are not logged in'))
      }
      const replaceHeader = headerAuth.replace('Bearer ', '')
      const decoded: any = Jwt.decode(replaceHeader)
      if (!decoded) {
        return next(new AppError(401, `Invalid token or user doesn't exist`))
      }
      // console.log(decoded)
      const userID = decoded.userObject.id
      console.log(userID)
      const userFound = await datasource.getRepository(User).findOneBy({
        id: requestParam.userId,
      });
      console.log(userFound)
      if (userID === userFound?.id) {
        return {
          message: `this id ${requestParam.userId} can not delete`,
        };
      } else {
        const userDelete = await datasource.getRepository(User).delete(requestParam.userId);
        console.log(userDelete)
        if (!userDelete) {
          return {
            message: `user id ${requestParam.userId} not found`,
          };
        }
        return {
          message: `user ${requestParam.userId} deleted successfully`,
        };
      }
    } catch (err: any) {
      return {
        message: err.message,
        stack: err.stack,
      };
    }
  };

  private static setUserData(requestParam: ICreateUser, target: any) {
    const user: ICreateUser = {
      name: requestParam.name || target.name,
      email: requestParam.email || target.email,
      password: target.password,
      mobile_no: requestParam.mobile_no || target.mobile_no,
      roles: target.roles,
      address: target.address
    }
    return user
  }
}
