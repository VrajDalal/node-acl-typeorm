import { NextFunction, Request, Response } from "express"
import Validator, { ValidationError } from "fastest-validator"
import fs from "fs"
import jwt, { DecodeOptions } from 'jsonwebtoken'
import { JsonWebTokenError, JwtPayload } from "jsonwebtoken"
import { NetConnectOpts } from "net"
import { authHelper } from "../helper/auth.helper"
import { userHelper } from "../helper/user.helper"
import { decode } from "punycode"
import { json } from "stream/consumers"
import { error } from "console"
import { promises } from "dns"
import { datasource } from "../core/datasource"
import { User } from "../entity/user.entity"
import { Roles } from "../entity/role.entity"
import { Permissions } from "../entity/permission.entity"

export class Auth {
	// public static validateDatabase = async () => {
	// 	const exists = await fs.existsSync('./assets/user.json')
	// 	if (!exists) {
	// 		await fs.writeFileSync('./assets/user.json', '[]')
	// 	}
	// }

	public static getRequestParams = (req: Request) => {
		const { body, query, params } = req
		return { ...body, ...query, ...params }
	}
	//middleware
	public static validateSchema(reqSchema: any = {}):
		(req: Request, res: Response, next: NextFunction) => void {
		const v: Validator = new Validator()
		return (req: Request, res: Response, next: NextFunction) => {
			const validate = v.compile(reqSchema)
			const validateResponce = validate(req.body)
			if (validateResponce == true) {
				next()
			} else {
				const error = validateResponce as ValidationError[]
				res.status(400).send({
					code: 400,
					message: 'Invalide Request Paramas',
					type: 'E_BAD_REQUEST_PARAMS',
					error: error
				})
			}
		}
	}
	//guard
	public static validateRole = async (req: Request, res: Response, next: NextFunction, requiredPermission: string) => {
		//Get JWT From Headers
		//check null or not if not than replace bearer with blank string
		const headerAuth = req.headers.authorization
		// console.log(headerAuth);
		if (!headerAuth) {
			return res.status(400).json({
				message: 'invalid token'
			})
		}
		const replaceHeaders = headerAuth.replace('Bearer ', '')
		//Decode JWT => from USER DATA
		const decoded: any = jwt.decode(replaceHeaders)
		const roleId = decoded.found.role.id
		// console.log(d);
		//Find Role from role table -> Invalid Role
		try {
			const roleFind = await datasource.getRepository(Roles).findOneBy({
				id: roleId
			})
			// const found = roleFind.find((role:any) => decodedRole === roleFinder)
			if (roleFind) {
				const getPermission = await datasource.getRepository(Permissions).findBy({
					// roles: roleId
				})
				// console.log(permission)
				const findPermission = getPermission.find((permission: any) => permission.name === requiredPermission);
				// console.log(findPermission)
				if (findPermission) {
					next
				} else {
					res.status(400).send({
						code: 400,
						message: 'You dont have enough permission to view this resource',
					})
				}
			} else {
				res.status(400).send({
					code: 400,
					message: 'Invalide Role',
				})
			}
		} catch (error: any) {
			res.status(500).send({
				code: 500,
				message: error.message,
				stack: error.stack,
				error: error
			})
		}
	}
	// const read = fs.readFileSync('./assets/role.json', { encoding: 'utf8', flag: 'r' })
	// if (read && decoded) {
	// 	const data = JSON.parse(read)
	// 	if (data.length > 0) {
	// 		const found = data.find((datas: any) => decoded.role === datas.id)
	// 		// console.log(found);
	// 		if (found) {
	// 			const validPermission = found.permissions.find((permission: any) => permission.type == requiredPermission)
	// 			// console.log(validPermission)
	// 			if (validPermission) {
	// 				(next)
	// 			} else {
	// 				return res.status(400).json({
	// 					message: 'you dont have access to the resource'
	// 				})
	// 			}
	// 		} else {
	// 			return res.status(400).json({
	// 				message: 'invalid role'
	// 			})
	// 		}
	// 	}
	// }
	//Get Permission from role table
	//Fine requiredPermission exist on permission from role.json -> Error messsage
}



