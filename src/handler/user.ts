import { NextFunction, Request, Response } from "express";
import { userHelper } from "../helper/user.helper";
import { validateObjectId } from "../utils/system-helper";
import { Auth } from "../utils/auth";
import { ICreateUser } from "../utils/interface/auth.interface";
import { ROLE } from "../utils/enum";

export const getUsersList = async (req: Request, res: Response, next: NextFunction) => {
    await Auth.validateRole(req, res, next, ROLE.VIEW_USERS)
    const result = await userHelper.getUsers(req)
    return res.status(200).json({ body: result })
}

export const createUserData = async (req: Request, res: Response, next: NextFunction) => {
    //integrate auth
    // await Auth.validateRole(req, res, next, ROLE.CREATE_USER)
    const payload = Auth.getRequestParams(req) as ICreateUser
    const result = await userHelper.createUser(payload)
    return res.status(200).json({ body: result })
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    // await Auth.validateRole(req, res, next, ROLE.VIEW_USER_BY_ID)
    const payload = Auth.getRequestParams(req)
    // console.log(payload.id);
    if (payload.id) {                               // && validateObjectId(payload.id)
        const result = await userHelper.getUser(payload.id)
        // console.log(result);
        return res.status(200).json({ body: result })
    } else {
        return res.status(400).json({
            body: {
                message: 'user id is missing'
            }
        })
    }
}



export const updateUserData = async (req: Request, res: Response, next: NextFunction) => {
    // await Auth.validateRole(req, res, next, ROLE.UPDATE_USER)
    const payload = Auth.getRequestParams(req)
    if (payload.id) {                                // && validateObjectId(payload.id)
        const result = await userHelper.updateUser(req, res)
        // console.log(result);
        return res.status(200).json({ body: result })
    } else {
        return res.status(400).json({
            body: {
                message: 'user id is missing'
            }
        })
    }
}


export const deleteUserData = async (req: Request, res: Response, next: NextFunction) => {
    // await Auth.validateRole(req, res, next, ROLE.DELETE_USER)
    const payload = Auth.getRequestParams(req)
    if (payload.id) {                               //&& validateObjectId(payload.id)
        const result = await userHelper.deleteUser(payload.id)
        return res.status(200).json({ body: result })
    } else {
        return res.status(400).json({
            body: {
                message: 'user id is missing'
            }
        })
    }
}
