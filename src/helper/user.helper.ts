import fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import { ICreateUser, IDeleteUser, IGetUser, IUpdateUser } from '../utils/interface/user.auth.interface';
import { Auth } from '../utils/auth';
import { User } from '../entity/user.entity';
import { Roles } from '../entity/role.entity';
import { datasource } from '../core/datasource';

//create new user
export class userHelper {
  public static getUsers = async () => {
    const user = await datasource.getRepository(User).find({ relations: { roles: true } });
    return user
  }

  public static getUser = async (requestParam: IGetUser, res: Response) => {
    try {
      const user = await datasource.getRepository(User).findOneBy({ id: requestParam.userId });
      console.log(user)
      if (user) {
        return user;
      } else {
        return {
          message: `user id ${requestParam.userId} is not exists`
        }
      }
    } catch (err: any) {
      res.status(500).json({
        message: err.message,
        stack: err.stack
      })
    }
  }

  public static createUser = async (payload: ICreateUser) => {
    const userRepository = await datasource.getRepository(User);
    const roleRepository = await datasource.getRepository(Roles);
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
    const user: any = await datasource.getRepository(User).findOneBy({ id: requestParam.userId });
    // console.log(user)
    if (user) {
      datasource.getRepository(User).merge(user, requestParam);
      // console.log(merger)
      const result = await datasource.getRepository(User).save(user);
      // console.log(result)
      return result;
    } else {
      return {
        message: `user id ${requestParam.userId} incorrect`
      };
    }
  }

  public static deleteUser = async (requestParam: IDeleteUser, res: Response) => {
    const user = await datasource.getRepository(User).findOneBy({
      id: requestParam.userId
    });
    if (user) {
      const userDelete = await datasource.getRepository(User).delete(requestParam.userId)
      if (userDelete) {
        return {
          message: `user ${requestParam.userId} deleted successfully`
        }
      } else {
        return {
          message: `user id ${requestParam.userId} not found`,
        };
      }
    } else {
      return {
        message: `user id ${requestParam.userId} doesn't exist`
      }
    }
  }
}
