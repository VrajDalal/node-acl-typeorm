import fs, { lstat } from "fs"
import jwt from "jsonwebtoken"
import { genrateString } from "../utils/system-helper";
import { Auth } from "../utils/auth";
import { IForgetUser, ILoginUser, IRegisterUser } from "../utils/interface/auth.interface";
import { datasource } from "../core/datasource";
import { User } from "../entity/user.entity";
import { Request, Response } from "express";
import { EnvironmentVariableName, findDataSource } from "typeorm-extension";


export class authHelper {
    public static loginUser = async (payload: ILoginUser) => {
        const users = await datasource.getRepository(User).find({
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

        // const read = fs.readFileSync('./assets/user.json', { encoding: 'utf8', flag: 'r' })
        // if (read) {
        //     const data = JSON.parse(read)
        //     if (data.length > 0) {
        //         const email = payload.email
        //         const password = payload.password
        //         const found = data.find((datas: any) => email === datas.email && password === datas.password)
        //         if (found) {
        //             const jwtToken = jwt.sign(found, 'secretkey', { expiresIn: '60d' })
        //             const userData = {
        //                 jwt: jwtToken,
        //                 user: found
        //             }
        //             return userData
        //         }
        //         else {
        //             return {
        //                 message: 'invalid email_id or password'
        //             }
        //         }

        //     } else {
        //         return {
        //             message: 'invalid email_id or password'
        //         }
        //     }

    }
    public static forgetPassword = async (req: Request, res: Response, payload: IForgetUser) => {

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
        // const read = fs.readFileSync('./assets/user.json', { encoding: 'utf8', flag: 'r' })
        // if (read) {
        //     const data = JSON.parse(read)
        //     if (data.length > 0) {
        //         const email = payload.email
        //         const forget = data.find((datas: any) => email === datas.email)
        //         if (forget) {
        //             return {
        //                 message: 'forget password reset link sent to your email_id'
        //             }
        //         } else {
        //             return {
        //                 message: 'invalid email_id'
        //             }
        //         }
        //     } else {
        //         return {
        //             message: 'invalid email_id'
        //         }
        //     }
        // }
    }
    public static registerUser = async (payload: IRegisterUser) => {

        const users = await datasource.getRepository(User).create(payload)
        try {
            const result = await datasource.getRepository(User).save(users)
            return result
        } catch {
            return {
                message: 'email_id already exists'
            }
        }
        // await Auth.validateDatabase()

        // const read = fs.readFileSync('./assets/user.json', { encoding: 'utf8', flag: 'r' })
        // if (read) {
        //     const data = JSON.parse(read)
        //     if (data.length > 0) {

        //         const email = payload.email
        //         const compare = data.some((datas: any) => email === datas.email)
        //         if (compare) {
        //             return {
        //                 message: 'email already exists'
        //             }
        //         } else {
        //             payload.id = genrateString(30)
        //             data.push(payload)
        //             fs.writeFileSync('./assets/user.json', JSON.stringify(data, null, 2))
        //             return {
        //                 message: 'user created successfully'
        //             }
        //         }
        //     } else {
        //         payload.id = genrateString(30)
        //         data.push(payload)
        //         fs.writeFileSync('./assets/user.json', JSON.stringify(data, null, 2))
        //         return {
        //             message: 'user created successfully'
        //         }
        //     }
        // }
    }
}
