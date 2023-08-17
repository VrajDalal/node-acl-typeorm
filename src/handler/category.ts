import { NextFunction, Request, Response } from "express";
import { Auth } from "../utils/auth";
import { ICreateCategory, IDeleteCategory, IGetCategory, IGetCategoryById, IUpdateCategory } from "../utils/interface/category.interface";
import { Category } from "../helper/category.helper";
import { applyFields } from "typeorm-extension";
import { IDeleteUploadById } from "../utils/interface/upload.posts";

export const getCategorysData = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as IGetCategory
    const result = await Category.getCategorys(payload)
    return res.status(200).json({ body: result })
}

export const getCategorysDataById = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as IGetCategoryById
    const result = await Category.getCategoryById(payload)
    return res.status(200).json({ body: result })
}

export const categoryData = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as ICreateCategory
    const result = await Category.createCategory(req, res, payload)
    return res.status(200).json({ body: result })
}

export const updateCategoryData = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as IUpdateCategory
    const result = await Category.updateCategory(req, res, payload)
    return res.status(200).json({ body: result })
}

export const deleteCategoryData = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as IDeleteCategory
    const result = await Category.deleteCategory(req, res, payload)
    return res.status(200).json({ body: result })
}