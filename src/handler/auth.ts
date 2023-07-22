import { Request, Response } from "express";
import { authHelper } from "../helper/auth.helper";
import { Auth } from "../utils/auth";
import { IForgetUser, ILoginUser, IRegisterUser } from "../utils/interface/user.auth.interface";

export const loginUserData = async (req: Request, res: Response) => {
    const payload = Auth.getRequestParams(req) as ILoginUser;
    const result = await authHelper.loginUser(payload)
    return res.status(200).json({ body: result })
}

export const registerUserData = async (req: Request, res: Response) => {
    const payload = Auth.getRequestParams(req) as IRegisterUser;
    const result = await authHelper.registerUser(payload)
    return res.status(200).json({ body: result })
}

export const forgetPasswordData = async (req: Request, res: Response) => {
    const payload = Auth.getRequestParams(req) as IForgetUser
    const result = await authHelper.forgetPassword(req, res, payload)
    return res.status(200).json({ body: result })
}
