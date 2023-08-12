import { NextFunction, Request, Response } from "express";
import { Auth } from "../utils/auth";
import { ICreateCategory, IGetCategory, IGetCategoryById } from "../utils/interface/category.interface";
import { Category } from "../helper/category.helper";

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