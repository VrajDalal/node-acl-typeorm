import { NextFunction, Request, Response } from "express";
import { Auth } from "../utils/auth";
import { ICreateUploadItem, IDeleteUploadById, IGetUpdateUploadById, IGetUploadItemById } from "../utils/interface/upload.posts";
import { UploadFiles } from "../helper/uploadItem.helper";


export const getUploadData = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req)
    const result = await UploadFiles.getUploadItems(req, res)
    return res.status(200).json({ body: result })
}

export const getUploadDataById = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as IGetUploadItemById
    const result = await UploadFiles.getUploadItemById(payload)
    return res.status(200).json({ body: result })
}

export const createUploadFile = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as ICreateUploadItem
    const result = await UploadFiles.createFile(req, payload)
    return res.status(200).json({ body: result })
}

export const updateUploadData = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as IGetUpdateUploadById
    const result = await UploadFiles.updateUploadItem(req, payload)
    return res.status(200).json({ body: result })
}

export const deleteUploadData = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as IDeleteUploadById
    const result = await UploadFiles.deleteUploadItem(req, payload)
    return res.status(200).json({ body: result })
}
