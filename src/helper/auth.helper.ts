import jwt from "jsonwebtoken"
import { IForgetUser, ILoginUser } from "../utils/interface/user.auth.interface";
import { IRegisterUser } from "../utils/interface/user.auth.interface";
import { datasource } from "../core/datasource";
import { User } from "../entity/user.entity";
import { Request, Response } from "express";


export class authHelper {
    public static loginUser = async (payload: ILoginUser, res: Response) => {
        try {
            const users = await datasource.getRepository(User).find({
                relations: {
                    roles: true
                }
            })
            const email = payload.email
            const password = payload.password
            // console.log(email);
            const found = users.find((datas: any) => email === datas.email && password === datas.password)
            // console.log(found);
            if (found) {
                const jwtToken = jwt.sign({ found }, 'secretkey', { expiresIn: '60d' })
                const userData = {
                    jwt: jwtToken,
                    users: found
                }
                return userData
            } else {
                return {
                    message: 'invalid email_id or password'
                }
            }
        } catch (err: any) {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            })
        }
    }

    public static forgetPassword = async (payload: IForgetUser, res: Response) => {
        try {
            const users = await datasource.getRepository(User).find({})

            const email = payload.email
            const forget = users.find((datas: any) => email === datas.email)

            // console.log(req.body.email);
            // console.log(payload.email)
            if (forget) {
                return {
                    message: 'forget password reset link sent to your email_id'
                }
            } else {
                return {
                    message: 'invalid email_id'
                }
            }
        } catch (err: any) {
            res.status(500).json({
                message: err.message,
                stack: err.stack
            })
        }
    }

    public static registerUser = async (payload: IRegisterUser, res: Response) => {
        try {
            console.log(payload)
            const userData: any = await datasource.getRepository(User).findOneBy({ email: payload.email });
            console.log(userData)
            if (userData) {
                return {
                    message: 'Email already exists!',
                };
            }
            // const existingRole = await roleRepository.findOneBy({
            //     id: payload.roles,
            // });
            // if (!existingRole) {
            //     return {
            //         message: 'Invalid Role!',
            //     };
            // }
            // console.log(existingRole);
            // delete payload.roles;
            // const userPayload: any = {
            //     ...payload,
            //     roles: existingRole,
            // };
            // console.log(userPayload);

            const createUser = await datasource.getRepository(User).create(payload)

            const result = await datasource.getRepository(User).save(createUser)
            return result
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack,
            };
        }
    }
}
