import { NextFunction, Request, Response } from "express";
import { UserPermission } from "../helper/permission.helper";
import { Auth } from "../utils/auth";
import { ICreatePermission, IDeletePermission, IUpdatePermission } from "../utils/interface/role.permission.interface";
import { User } from "../entity/user.entity";
import { IDatabase } from "@google-cloud/spanner/build/src/instance";

export const getPermissionsData = async (req: Request, res: Response, next: NextFunction) => {
    const reqParams = Auth.getRequestParams(req) as ICreatePermission
    const result = await UserPermission.getPermissions(reqParams)
    return res.status(200).json({ body: result })
}

export const getPermissionByIdData = async (req: Request, res: Response, next: NextFunction) => {
    const reqParams = Auth.getRequestParams(req) as ICreatePermission
    const result = await UserPermission.getPermissionById(reqParams, res)
    return res.status(200).json({ body: result })
}

export const createPermissionData = async (req: Request, res: Response, next: NextFunction) => {
    const reqParams = Auth.getRequestParams(req) as ICreatePermission
    const result = await UserPermission.createPermissions(reqParams, res)
    return res.status(200).json({ body: result })
}

export const updatePermissionData = async (req: Request, res: Response, next: NextFunction) => {
    const reqParams = Auth.getRequestParams(req) as IUpdatePermission
    const result = await UserPermission.updatePermission(reqParams, res)
    return res.status(200).json({ body: result })
}

export const deletePermissionData = async (req: Request, res: Response, next: NextFunction) => {
    const reqParams = Auth.getRequestParams(req) as IDeletePermission
    const result = await UserPermission.deletePermission(reqParams, res)
    return res.status(500).json({ body: result })
}