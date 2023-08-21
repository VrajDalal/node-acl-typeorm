import { CategoryItem } from "../../entity/category.entity"
import { UploadItem } from "../../entity/uploadPost.entity"
import { User } from "../../entity/user.entity"

export interface ICreatePostItem {
    name: string
    short_description: string
    detail: string
    likes: number
    views: number
    shares: number
    is_published: Date
    is_deleted: Date
    users: string
    image: string
    category: string
}

export interface IGetPostById {
    id: string
}

export interface IUpdatePost extends ICreatePostItem, IGetPostById { }

export interface IDeletePost extends IGetPostById { }