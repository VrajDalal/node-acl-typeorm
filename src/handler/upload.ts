import { NextFunction, Request, Response } from "express";
import { Auth } from "../utils/auth";
import { IUploadItem } from "../utils/interface/upload.posts";
import { UploadFiles } from "../helper/uploadItem.helper";

export const uploadImages = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as IUploadItem
    const result = await UploadFiles.uploadIMG(req, res, payload)
    return res.status(200).json({ body: result })
}