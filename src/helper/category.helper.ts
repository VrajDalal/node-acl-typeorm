import { Request, Response } from "express";
import { ICreateCategory, IGetCategory, IGetCategoryById } from "../utils/interface/category.interface";
import { datasource } from "../core/datasource";
import { CategoryItem } from "../entity/category.entity";
import { UploadFiles } from "./uploadItem.helper";
import datauri from "datauri"


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
                }
            })
            const categoryId = await datasource.getRepository(CategoryItem).findOneBy({
                id: payload.id
            })

            if (categoryIcon && categoryId) {
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
                    extension: fileUploder.mimetype
                }
                uploadRes = await UploadFiles.uploadIMG(req, res, data)
                if(uploadRes && uploadRes.status === 400){
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
}