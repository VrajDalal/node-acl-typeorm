import { NextFunction, Request, Response } from "express";
import { UserRole } from "../helper/role.helper";
import { User } from "../entity/user.entity";
import { Auth } from "../utils/auth";
import { ICreateRole, IDeleteRole, IUpdateRole } from "../utils/interface/role.permission.interface";

export const getRoleData = async (req: Request, res: Response, next: NextFunction) => {
    const reqParams = await Auth.getRequestParams(req) as ICreateRole
    const result = await UserRole.getRoles(reqParams)
    return res.status(200).json({ body: result })
}

export const getRoleIdData = async (req: Request, res: Response, next: NextFunction) => {
    const reqParams = await Auth.getRequestParams(req) as ICreateRole
    const result = await UserRole.getRolesById(reqParams, res)
    return res.status(200).json({ body: result })
}

export const createRoleData = async (req: Request, res: Response, next: NextFunction) => {
    const reqParams = await Auth.getRequestParams(req) as ICreateRole
    const result = await UserRole.createRole(reqParams, res)
    return res.status(200).json({ body: result })
}


export const updateRoleById = async (req: Request, res: Response, next: NextFunction) => {
    const reqParams = await Auth.getRequestParams(req) as IUpdateRole
    const result = await UserRole.updateRole(reqParams, res,)
    return res.status(200).json({ body: result })
}

export const deleteRoleById = async (req: Request, res: Response, next: NextFunction) => {
    const reqParams = await Auth.getRequestParams(req) as IDeleteRole
    const result = await UserRole.deleteRole(reqParams, res)
    return res.status(200).json({ body: result })
}