import { Request, Response } from "express";
import { ICreateCategory, IDeleteCategory, IGetCategory, IGetCategoryById, IUpdateCategory } from "../utils/interface/category.interface";
import { datasource } from "../core/datasource";
import { CategoryItem } from "../entity/category.entity";
import { UploadFiles } from "./uploadItem.helper";
import datauri from "datauri"
import { UploadItem } from "../entity/uploadPost.entity";
import { IDeleteUploadById } from "../utils/interface/upload.posts";
import path, { relative } from "path";


export class Category {
    public static getCategorys = async (payload: IGetCategory) => {
        const categorys = await datasource.getRepository(CategoryItem).find({
            relations: {
                icon: true
            }
        })
        return categorys
    }

    public static getCategoryById = async (payload: IGetCategoryById) => {
        try {
            const categoryIcon = await datasource.getRepository(CategoryItem).find({
                relations: {
                    icon: true
                }, where: {
                    id: payload.id
                }
            })
            if (categoryIcon) {
                return categoryIcon
            } else {
                return {
                    message: `category id ${payload.id} not found`
                }
            }
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack
            }
        }
    }

    public static createCategory = async (req: Request, res: Response, payload: ICreateCategory) => {
        try {
            const fileUploder: any = req.files?.image
            let uploadRes: any = []
            if (fileUploder) {
                const data = {
                    name: payload.name,
                    file_name: fileUploder.name,
                    path: fileUploder.tempFilePath,
                    size: fileUploder.size,
                    extension: fileUploder.mimetype,
                }
                uploadRes = await UploadFiles.createFile(req, res, data)
                if (uploadRes && uploadRes.status === 400) {
                    return uploadRes
                }
                if (uploadRes) {
                    const dataUploaded = {
                        name: payload.name,
                        icon: uploadRes
                    }
                    const create = await datasource.getRepository(CategoryItem).create(dataUploaded)
                    const result = await datasource.getRepository(CategoryItem).save(create)
                    return result
                } else {
                    return {
                        mesaage: 'insert category name and upload image'
                    }
                }
            }
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack
            }
        }
    }

    public static updateCategory = async (req: Request, res: Response, payload: IUpdateCategory) => {
        try {
            const categoryIcon: any = await datasource.getRepository(CategoryItem).find({
                where: {
                    id: payload.id
                }, relations: {
                    icon: true
                }
            })
            if (!categoryIcon) {
                return {
                    staus: 400,
                    message: `category id ${payload.id} not exits`
                }
            }
            const data = this.setCategoryData(payload, categoryIcon)
            const merger = await datasource.getRepository(CategoryItem).merge(categoryIcon[0], data)
            const result = await datasource.getRepository(CategoryItem).save(merger)
            const uploadResponce = await UploadFiles.updateUploadItem(req, categoryIcon[0].icon, res)
            if (uploadResponce) {
                return uploadResponce
            }
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack
            }
        }
    }

    public static deleteCategory = async (req: Request, res: Response, payload: IDeleteCategory) => {
        try {
            const categoryFind: any = await datasource.getRepository(CategoryItem).find({
                relations: {
                    icon: true
                }, where: {
                    id: payload.id
                }
            })
            if (!categoryFind) {
                return {
                    message: `category id ${payload.id} not exists`
                }
            }
            const category: any = await datasource.getRepository(CategoryItem).delete(categoryFind)
            if (category.affected === 0) {
                return {
                    message: `category id ${payload.id} not exists`
                }
            } else {
                const deleteUploadfile = await UploadFiles.deleteUploadItem(req, categoryFind[0].icon, res)
                return {
                    message: `category id ${payload.id} deleted successfully`
                }
            }
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack
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
    //         name: uploadImage.name,
    //         file_name: uploadImage.name,
    //         path: filename,
    //         size: uploadImage.size,
    //         extension: uploadImage.mimetype
    //     }
    //     if (data) {
    //         return data
    //     }
    // }

    private static setCategoryData(payload: IUpdateCategory, target: any) {
        const category: IUpdateCategory = {
            name: payload.name || target.name,
            image: payload.image || target.image,
            id: target.id
        }
        return category
    }
}
