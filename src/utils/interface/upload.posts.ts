export interface ICreateUploadItem {
    file_name: string
    path: string
    size: string
    extension: string
}

export interface IGetUploadItemById {
    id: string
}

export interface IGetUpdateUploadById extends ICreateUploadItem, IGetUploadItemById { }

export interface IDeleteUploadById extends IGetUploadItemById { }