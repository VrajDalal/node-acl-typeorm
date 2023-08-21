import { NextFunction, Request, Response } from "express";
import { Auth } from "../utils/auth";
import { ICreatePostItem, IDeletePost, IGetPostById, IUpdatePost } from "../utils/interface/post.interface";
import { Post } from "../helper/post.helper";


export const getPostData = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req)
    const result = await Post.getPosts()
    return res.status(200).json({ body: result })
}

export const getPostByIdData = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as IGetPostById
    const result = await Post.getPostById(payload)
    return res.status(200).json({ body: result })
}

export const createPostData = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as ICreatePostItem
    const result = await Post.createPost(payload)
    return res.status(200).json({ body: result })
}

export const updatePostData = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as IUpdatePost
    const result = await Post.updatePost(payload)
    return res.status(200).json({ body: result })
}

export const deletePostData = async (req: Request, res: Response, next: NextFunction) => {
    const payload = Auth.getRequestParams(req) as IDeletePost
    const result = await Post.deletePost(req,payload)
    return res.status(200).json({ body: result })
}