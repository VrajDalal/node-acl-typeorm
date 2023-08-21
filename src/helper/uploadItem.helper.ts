import { Request, Response } from "express";
import { ICreateUploadItem, IDeleteUploadById, IGetUpdateUploadById, IGetUploadItemById } from "../utils/interface/upload.posts";
import { datasource } from "../core/datasource";
import { UploadItem } from "../entity/uploadPost.entity";
import fs from "fs"
import path from "path";
import { Numeric } from "@google-cloud/spanner/build/src/codec";
import { fileURLToPath } from "url";
import { stringify } from "querystring";

export class UploadFiles {

    public static getUploadItems = async (req: Request, res: Response) => {
        const items = await datasource.getRepository(UploadItem).find({})
        return items
    }

    public static getUploadItemById = async (payload: IGetUploadItemById, res: Response) => {
        try {
            const item = await datasource.getRepository(UploadItem).findOneBy({
                id: payload.id
            })
            if (item) {
                return item
            } else {
                return {
                    message: `upload item id ${payload.id} not exists`
                }
            }
        } catch (err: any) {
            return {
                message: err.mesasge,
                stack: err.stack
            }
        }
    }

    public static createFile = async (req: Request, res: Response, reqSchema: ICreateUploadItem) => {
        try {
            const maxSizeinMB = 5
            const uploadPath = './src/img'
            const fileUpload: any = await this.uploadFiles(req, maxSizeinMB, uploadPath)
            if (fileUpload) {
                const imageData = await datasource.getRepository(UploadItem).create(fileUpload)
                const result = await datasource.getRepository(UploadItem).save(imageData)
                return result
            }
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack
            }
        }
    }

    public static updateUploadItem = async (req: Request, payload: IGetUpdateUploadById, res: Response) => {
        try {
            const item = await datasource.getRepository(UploadItem).findOneBy({
                id: payload.id
            })
            const maxSizeinMB = 5
            const uploadPath = './src/img'
            const fileUpload: any = await this.uploadFiles(req, maxSizeinMB, uploadPath)
            if (item && fileUpload) {
                const merger = datasource.getRepository(UploadItem).merge(payload, fileUpload)
                const result = await datasource.getRepository(UploadItem).save(merger)
                return fileUpload
            } else {
                return {
                    message: `upload item id ${payload.id} not exists`
                }
            }
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack
            }
        }
    }

    public static deleteUploadItem = async (req: Request, payload: IDeleteUploadById, res: Response) => {
        try {
            const findFile: any = await datasource.getRepository(UploadItem).findOneBy({
                id: payload.id
            })
            await fs.unlinkSync(`./src/img/${findFile.path}`)
            const item = await datasource.getRepository(UploadItem).delete({
                id: payload.id
            })
            if (item.affected === 0) {
                return {
                    message: `upload item id ${payload.id} not exits`
                }
            } else {
                return {
                    message: `upload item id ${payload.id} delete successfully`
                }
            }
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack
            }
        }
    }

    private static uploadFiles = async (req: Request, maxSizeinMB: any, uploadPath: any) => {
        try {
            const uploadImage: any = req.files?.image
            if (!uploadImage) {
                return {
                    status: 400,
                    message: 'file is not upload'
                }
            }
            const filename: any = Date.now() + '-' + uploadImage.name
            const newPath = path.join(process.cwd(), uploadPath, filename)
            uploadImage.mv(newPath)
            if (uploadImage.size >= 0) {
                const fileSize = uploadImage.size
                const fileMb = fileSize / 1024 / 1024
                if (fileMb > maxSizeinMB) {
                    return {
                        status: 400,
                        message: `upload file upto ${maxSizeinMB} MB`
                    }
                }
            }
            const filedata = {
                file_name: uploadImage.name,
                path: filename,
                size: uploadImage.size,
                extension: uploadImage.mimetype
            }
            if (filedata) {
                return filedata
            }
        } catch (err: any) {
            return {
                status: 500,
                message: 'internal server issue'
            }
        }
    }

    // private static uploadFileAndId = async (req: Request, file: any, id: string) => {

    //     const uploadImage: any = req.files?.image
    //     const filename: any = Date.now() + '-' + uploadImage.name
    //     const uploadPath = './src/img'
    //     const newPath = path.join(process.cwd(), uploadPath, filename)
    //     uploadImage.mv(newPath)
    //     const data = {
    //         image: {
    //             file_name: uploadImage.name,
    //             path: filename,
    //             size: uploadImage.size,
    //             extension: uploadImage.mimetype
    //         }
    //     }
    //     if (data) {
    //         return data
    //     }
    // }
}

