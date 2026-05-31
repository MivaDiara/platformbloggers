import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsRepository} from "../../../blogs/repositories/blogs.repository";



export async function updatePostHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const foundedPost = await postsRepository.findById(id);

        if(!foundedPost) {
            res.status(HTTPStatus.NOT_FOUND).send("Post not found");
            return;
        }
        const foundBlog = await BlogsRepository.findByID(req.body.blogId.toString());
        if(!foundBlog) {
            return res.status(HTTPStatus.NOT_FOUND).send("Blog not found");
        }
        await postsRepository.update(id, req.body);
        res.sendStatus(HTTPStatus.NO_CONTENT);
    }
    catch (e) {
        res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
    }

}