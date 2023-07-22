import fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import { ICreateUser, IDeleteUser, IUpdateUser } from '../utils/interface/user.auth.interface';
import { Auth } from '../utils/auth';
import { User } from '../entity/user.entity';
import { Roles } from '../entity/role.entity';
import { datasource } from '../core/datasource';

//create new user
export class userHelper {
  public static getUsers = async (requestParam: ICreateUser) => {
    const user = await datasource.getRepository(User).find({ relations: { roles: true } });
    return user
  }

  public static getUser = async (requestParam: ICreateUser, res: Response) => {
    try {
      const user = await datasource.getRepository(User).findOneBy({ id: requestParam.id });
      console.log(user)
      if (user) {
        return user;
      } else {
        return {
          message: `user id ${requestParam.id} is not exists`
        }
      }
    } catch (err: any) {
      res.status(500).send({
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
    // const payload = req.body
    // console.log(payload)
    const user: any = await datasource.getRepository(User).findOneBy({ id: requestParam.id });
    // console.log(user)
    if (user) {
      delete requestParam.id && requestParam.email
      datasource.getRepository(User).merge(user, requestParam);
      // console.log(merger)
      const result = await datasource.getRepository(User).save(user);
      // console.log(result)
      return result;
    } else {
      return {
        message: `user id ${requestParam.id} incorrect`
      };
    }
  }

  public static deleteUser = async (requestParam: IDeleteUser, res: Response) => {
    const user = await datasource.getRepository(User).delete(requestParam);
    if (user.affected == 0) {
      return {
        message: `user id ${requestParam.id} not exists`,
      };
    } else {
      return {
        message: `user id ${requestParam.id} deleted successfully`,
      };
    }
  }
}
