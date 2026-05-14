import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {mapToPostViewModel} from "../../mapping/maps-to-post-view";
import {BlogsRepository} from "../../../blogs/repositories/blogs.repository";

export async function getPostHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const post = await postsRepository.findById(id);
        if(!post) {
            res.status(HTTPStatus.NOT_FOUND).send("Post not found");
            return;
        }
        const blog = await BlogsRepository.findByID(post.blogId.toString());
        if(!blog) {
            res.status(HTTPStatus.NOT_FOUND).send("Blog not found");
            return;
        }
        const postMapping = mapToPostViewModel(post, blog);
        res.status(HTTPStatus.OK).json(postMapping);
    }
    catch(e){

    }
}