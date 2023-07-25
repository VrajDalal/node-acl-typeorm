import { NextFunction, Request, Response } from "express";
import { datasource } from "../core/datasource";
import { Permissions } from "../entity/permission.entity";
import { ICreatePermission, IDeletePermission, IUpdatePermission } from "../utils/interface/role.permission.interface";


export class UserPermission {
    public static getPermissions = async (requestParam: ICreatePermission) => {
        const permission = await datasource.getRepository(Permissions).find({})
        return permission
    }

    public static getPermissionById = async (requestParam: ICreatePermission, res: Response) => {
        try {
            const permission = await datasource.getRepository(Permissions).findOneBy({ id: requestParam.id })
            if (permission) {
                return permission
            } else {
                return `user id ${requestParam.id} not exists`
            }
        } catch (err: any) {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            })
        }
    }

    public static createPermissions = async (requestParam: ICreatePermission, res: Response) => {
        try {
            const permission = await datasource.getRepository(Permissions).findOneBy({ name: requestParam.name })
            // console.log(permission)
            if (permission) {
                return {
                    messgae: 'permission already exists'
                }
            } else {
                const permission = await datasource.getRepository(Permissions).create(requestParam)
                const result = await datasource.getRepository(Permissions).save(permission)
                // console.log(result)
                return result
            }
        } catch (err: any) {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            })
        }
    }

    public static updatePermission = async (requestParam: IUpdatePermission, res: Response) => {
        try {
            const permission = await datasource.getRepository(Permissions).findOneBy({ id: requestParam.id })
            if (permission) {
                delete requestParam.id
                datasource.getRepository(Permissions).merge(permission, requestParam)
                const result = await datasource.getRepository(Permissions).save(permission)
                return result
            } else {
                return {
                    mesasge: `user id ${requestParam.id} not exists`
                }
            }
        } catch (err: any) {
            res.status(500).json({
                message: err.message,
                stacl: err.stack
            })
        }
    }

    public static deletePermission = async (requestParam: IDeletePermission, res: Response) => {
        try {
            const permission = await datasource.getRepository(Permissions).delete(requestParam)
            if (permission.affected == 0) {
                return {
                    message: `permission ${requestParam.id} not found`
                }
            } else {
                return {
                    message: `permission ${requestParam.id} deleted successfully`
                }
            }
        } catch (err: any) {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            })
        }
    }
}