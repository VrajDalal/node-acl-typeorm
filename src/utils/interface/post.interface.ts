import { CategoryItem } from "../../entity/category.entity"
import { UploadItem } from "../../entity/uploadPost.entity"
import { User } from "../../entity/user.entity"

export interface PostItem {
    name: string
    short_description: string
    detail: string
    likes: number
    views: number
    shares: number
    is_published: boolean
    is_deleted: boolean
    user_id: User
    image: UploadItem
    category: CategoryItem
}