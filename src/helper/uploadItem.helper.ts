import { Request, Response } from "express";
import { IUploadItem } from "../utils/interface/upload.posts";
import { datasource } from "../core/datasource";
import { UploadItem } from "../entity/uploadPost.entity";

export class UploadFiles {
    public static uploadIMG = async (req: Request, res: Response, reqSchema: IUploadItem) => {
        let uploadImage: any = req.files?.image

        if (uploadImage.size >= 0) {
            const fileSize = uploadImage.size
            const fileMb = fileSize / 1024 / 1024
            if (fileMb >= 5) {
                return {
                    status: 400,
                    message: 'upload file upto 5MB'
                }
            }
            if (uploadImage) {
                const data = ({
                    file_name: uploadImage.name,
                    path: uploadImage.tempFilePath,
                    size: uploadImage.size,
                    extension: uploadImage.mimetype
                })
                const imageData = await datasource.getRepository(UploadItem).create(data)
                const result = await datasource.getRepository(UploadItem).save(imageData)
                return result
            } else {
                return {
                    message: 'please upload image'
                }
            }
        }
    }
}