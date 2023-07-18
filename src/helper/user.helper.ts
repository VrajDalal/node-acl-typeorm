import fs from "fs"
import { NextFunction, Request, Response } from "express";
import { ICreateUser, IDeleteUser, IUpdateUser } from "../utils/interface/auth.interface";
import { Auth } from "../utils/auth";
import { User } from "../entity/user.entity"
import { Roles } from "../entity/role.entity";
import { datasource } from "../core/datasource";
import { Any, DeleteResult, Unique } from "typeorm";
import { off } from "process";

//create new user
export class userHelper {
    public static getUsers = async (req: Request) => {

        const user = await datasource.getRepository(User).find({
            relations: {
                roles: true
            }
        })
        return user
        // const read = fs.readFileSync('./assets/user.json', { encoding: 'utf8', flag: 'r' })
        // if (read) {
        //     const data = JSON.parse(read)
        //     return data
        // }
    }

    public static getUser = async (id: string) => {

        const user = await datasource.getRepository(User).findOneBy({ id })
        if (user) {
            return user
        } else {
            return {
                message: `user id ${id} is not exists`
            }
        }
        // const read = fs.readFileSync('./assets/user.json', { encoding: 'utf8', flag: 'r' })
        // if (read) {
        //     const data = JSON.parse(read)
        //     if (data.length > 0) {
        //         const compare = data.find((datas: any) => id === datas.id)
        //         if (compare) {
        //             return compare
        //         }
        //         else {
        //             return {
        //                 message: `user with id: ${id} doesn't exist`
        //             }
        //         }
        //     }
        // }
    }

    public static createUser = async (payload: ICreateUser) => {
        const userRepository = await datasource.getRepository(User)
        const roleRepository = await datasource.getRepository(Roles)
        try {
            const userData = await userRepository.findOneBy({ email: payload.email })
            // console.log(userData)
            if (userData) {
                return {
                    mesage: "Email already exists!"
                }
            }
            const existingRole = await roleRepository.findOneBy({ id: payload.roles })
            console.log(existingRole)
            delete payload.roles;
            const userPayload: any = {
                ...payload,
                roles: existingRole,
            }
            console.log(userPayload)
            const user = await userRepository.create(userPayload)

            const result = await userRepository.save(user)
            return result
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack
            }
        }
    }

    public static updateUser = async (req: Request, res: Response) => {
        const user: any = await datasource.getRepository(User).findOneBy({ id: req.params.id })
        // console.log(user)
        if (user) {
            const merger = datasource.getRepository(User).merge(user, req.body)
            // console.log(merger)
            const result = await datasource.getRepository(User).save(user)
            return result
        } else {
            return {
                message: `user id ${req.params.id} incorrect`
            }
        }

        // await Auth.validateDatabase()
        // const read = fs.readFileSync('./assets/user.json', { encoding: 'utf8', flag: 'r' })
        // if (read) {
        //     const data = JSON.parse(read)
        //     if (data.length > 0) {
        //         const tempPayload: any = payload
        //         const compare = data.find((datas: any) => payload.id === datas.id)
        //         const updatedData = data.filter((elem: any) => payload.id !== elem.id)

        //         delete tempPayload.email;
        //         delete tempPayload.id;

        //         const updatePayload = {
        //             ...compare,
        //             ...Object.keys(tempPayload).filter((key) => key in compare).reduce((obj: any, key: any) => {
        //                 obj[key] = tempPayload[key]
        //                 return obj;
        //             }, {} as Partial<IUpdateUser>)
        //         }
        //         updatedData.push(updatePayload)
        //         fs.writeFileSync('./assets/user.json', JSON.stringify(updatedData, null, 2))
        //         return updatePayload
        //     } else {
        //         return {
        //             message: `user id: ${payload.id} incorrect`
        //         }
        //     }
        // } else {
        //     return {
        //         message: `user id: ${payload.id} incorrect`
        //     }
        // }
    }

    public static deleteUser = async (id: string) => {

        const user = await datasource.getRepository(User).delete(id)
        if (user.affected === 0) {
            return {
                message: `user id ${id} incorrect`
            }
        } else {
            return {
                message: `user id ${id} deleted successfully`
            }
        }
    }
    // await Auth.validateDatabase()

    // const read = fs.readFileSync('./assets/user.json', { encoding: 'utf8', flag: 'r' })
    // if (read) {
    //     const data = JSON.parse(read)
    //     const compare = data.find((datas: any) => payload.id === datas.id)
    //     if (compare) {
    //         const update = data.filter((obj: any) => compare.id !== obj.id)
    //         fs.writeFileSync('./assets/user.json', JSON.stringify(update, null, 2))
    //         return {
    //             message: 'user deleted succefully'
    //         }
    //     } else {
    //         return {
    //             message: `user id: ${payload.id} incorrect`
    //         }
    //     }
    // } else {
    //     return {
    //         message: `user id: ${payload.id} incorrect`
    //     }
    // }
}




