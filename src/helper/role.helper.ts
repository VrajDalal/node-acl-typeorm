import { Response } from "express";
import { datasource } from "../core/datasource";
import { Roles } from "../entity/role.entity";
import { ICreateRole, IDeleteRole, IGetRole, IUpdateRole } from "../utils/interface/role.permission.interface";
import { Permissions } from "../entity/permission.entity";


export class UserRole {
    public static getRoles = async () => {
        const role = await datasource.getRepository(Roles).find({
            relations: {
                permission: true
            }
        })
        return role
    }

    public static getRolesById = async (requestParam: IGetRole, res: Response) => {

        try {
            const role = await datasource.getRepository(Roles).find({
                relations: {
                    permission: true
                }, where: {
                    id: requestParam.id
                }
            })
            // const role = await datasource.getRepository(Roles).findOneBy({ id: requestParam.id })
            if (role) {
                return role
            } else {
                return {
                    message: `user id ${requestParam.id} not exists`
                }
            }
        } catch (err: any) {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            })
        }
    }

    public static createRole = async (requestParam: ICreateRole, res: Response) => {
        try {
            const newPermissions: any = []
            // console.log(requestParam.permissions)
            for (let i = 0; i < requestParam.permissions.length; i++) {
                const permission = await datasource.getRepository(Permissions).findOneBy({ id: requestParam.permissions[i] })
                if (!permission) {
                    return {
                        message: 'Invalid Permisssion'
                    }
                }

                newPermissions.push(permission)
            }
            const rolePayload: any = {
                ...requestParam,
                permission: newPermissions
            }
            const role = await datasource.getRepository(Roles).create(rolePayload)
            const result = await datasource.getRepository(Roles).save(role)
            return result;
        } catch (err: any) {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            })
        }
    }


    public static updateRole = async (requestParam: IUpdateRole, res: Response) => {
        try {
            const role = await datasource.getRepository(Roles).findOneBy({
                id:requestParam.id
            })
            if (role) {
                // delete requestParam.id
                datasource.getRepository(Roles).merge(role, requestParam)
                const result = await datasource.getRepository(Roles).save(role)
                return result
            } else {
                return {
                    message: `user id ${requestParam.id} not exists`
                }
            }
        } catch (err: any) {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            })
        }
    }

    public static deleteRole = async (requestParams: IDeleteRole, res: Response) => {
        try {
            const role = await datasource.getRepository(Roles).delete({ id: requestParams.id })
            if (role.affected === 0) {
                return {
                    message: 'role not found'
                }
            } else {
                return {
                    message: `role ${requestParams.id} deleted successfully`
                }
            }
        } catch (err: any) {
            res.status(500).json({
                message: err.message,
                stack: err.stac
            })
        }
    }
}