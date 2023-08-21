import { NextFunction, Request, Response } from 'express';
import { userHelper } from '../helper/user.helper';
import { validateObjectId } from '../utils/system-helper';
import { Auth } from '../utils/auth';
import { ICreateUser, IDeleteUser, IGetUser, IUpdateUser, } from '../utils/interface/user.auth.interface';
import { ROLE } from '../utils/enum';

export const getUsersList = async (req: Request, res: Response, next: NextFunction) => {
  const result = await userHelper.getUsers();
  return res.status(200).json({ body: result });
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const payload = Auth.getRequestParams(req) as IGetUser;
  const result = await userHelper.getUser(payload, res);
  return res.status(200).json({ body: result });
};

export const createUserData = async (req: Request, res: Response, next: NextFunction) => {
  const payload = Auth.getRequestParams(req) as ICreateUser;
  const result = await userHelper.createUser(payload);
  return res.status(200).json({ body: result });
};

export const updateUserData = async (req: Request, res: Response, next: NextFunction) => {
  const payload = Auth.getRequestParams(req) as IUpdateUser; // && validateObjectId(payload.id)
  const result = await userHelper.updateUser(payload, res);
  return res.status(200).json({ body: result });
};

export const deleteUserData = async (req: Request, res: Response, next: NextFunction) => {
  const payload = Auth.getRequestParams(req) as IDeleteUser;
  const result = await userHelper.deleteUser(req,payload,next);
  return res.status(200).json({ body: result });
};
