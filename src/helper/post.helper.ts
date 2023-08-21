import { fileURLToPath } from "url";
import { datasource } from "../core/datasource";
import { CategoryItem } from "../entity/category.entity";
import { PostItem } from "../entity/post.entity";
import { UploadItem } from "../entity/uploadPost.entity";
import { User } from "../entity/user.entity";
import { ICreatePostItem, IDeletePost, IGetPostById, IUpdatePost } from "../utils/interface/post.interface";
import { ICreateUser } from "../utils/interface/user.auth.interface";
import { error } from "console";


export class Post {
    public static getPosts = async () => {
        const posts = await datasource.getRepository(PostItem).find({
            relations: {
                users: true,
                category: true,
                image: true
            }
        })
        return posts
    }

    public static getPostById = async (payload: IGetPostById) => {
        try {
            const post = await datasource.getRepository(PostItem).find({
                relations: {
                    users: true,
                    category: true,
                    image: true
                }, where: {
                    id: payload.id
                }
            })
            if (post) {
                return post
            } else {
                return `post id ${payload.id} not exits`
            }
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack
            }
        }
    }

    public static createPost = async (payload: ICreatePostItem) => {
        try {
            const requestParam: any = payload

            if (requestParam.users) {
                const user = await datasource.getRepository(User).findOneBy({
                    id: requestParam.users
                })
                if (!user) {
                    return {
                        message: `user id ${requestParam.users} is not exists`
                    }
                }
            }

            if (requestParam.category) {
                const category: any = await datasource.getRepository(CategoryItem).findOneBy({
                    id: requestParam.category,
                })
                if (!category) {
                    return {
                        message: `category id ${requestParam.category} is not exists`
                    }
                }
            }

            if (requestParam.image) {
                const file: any = await datasource.getRepository(UploadItem).findOneBy({
                    id: requestParam.image,
                })
                if (!file) {
                    return {
                        message: `file id ${requestParam.image} is not exists`
                    }
                }
            }

            const post: any = await datasource.getRepository(PostItem).create(requestParam)
            const result = await datasource.getRepository(PostItem).save(post)
            return result
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack
            }
        }
    }

    public static updatePost = async (payload: IUpdatePost) => {
        try {
            const reqparams: any = payload
            const post: any = await datasource.getRepository(PostItem).find({
                relations: {
                    users: true,
                    category: true,
                    image: true
                }, where: {
                    id: reqparams.id
                }
            })

            const postId = post[0]
            if (!postId) {
                return {
                    message: `post id ${reqparams.id} not exists`
                }
            }
            if (!reqparams) {
                return {
                    message: 'empty'
                }
            }

            const detail: any = {
                ...reqparams,
            }
            if (reqparams.category) {
                const categorys = await datasource.getRepository(CategoryItem).findOneBy({
                    id: reqparams.category
                })
                if (categorys) {
                    detail.category = categorys
                } else {
                    return {
                        message: `category id ${reqparams.category} not exists`
                    }
                }
            }

            if (reqparams.users) {
                const user = await datasource.getRepository(User).findOneBy({
                    id: reqparams.users
                })
                if (user) {
                    detail.users = user
                } else {
                    return {
                        message: `user id ${reqparams.users} not exists`
                    }
                }
            }

            if (reqparams.image) {
                const file: any = await datasource.getRepository(UploadItem).findOneBy({
                    id: reqparams.image
                })
                if (file) {
                    detail.image = file
                } else {
                    return {
                        message: `file id ${reqparams.image} not exists`
                    }
                }
            }
            const data: any = await this.setPostData(detail, postId)
            const merger = await datasource.getRepository(PostItem).merge(postId, data)
            const result = await datasource.getRepository(PostItem).save(merger)
            return result
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack
            }
        }
    }

    public static deletePost = async (payload: IDeletePost) => {
        try {
            const post = await datasource.getRepository(PostItem).delete({
                id: payload.id
            })
            if (post.affected == 0) {
                return {
                    message: `post id ${payload.id} not exists`
                }
            } else {
                return {
                    message: `post id ${payload.id} is deleted successfully`
                }
            }
        } catch (err: any) {
            return {
                message: err.message,
                stack: err.stack
            }
        }
    }

    private static setPostData = (reqparams: ICreatePostItem, target: any) => {
        const postItem: ICreatePostItem = {
            name: reqparams.name || target.name,
            short_description: reqparams.short_description || target.short_description,
            detail: reqparams.detail || target.detail,
            likes: reqparams.likes || target.likes,
            views: reqparams.views || target.views,
            shares: reqparams.shares || target.shares,
            is_published: reqparams.is_published || target.is_published,
            is_deleted: reqparams.is_deleted || target.is_deleted,
            users: reqparams.users || target.users,
            image: reqparams.image || target.image,
            category: reqparams.category || target.category
        }
        return postItem
    }
}
