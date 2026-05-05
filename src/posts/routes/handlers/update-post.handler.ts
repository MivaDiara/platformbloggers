import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";


export function updatePostHandler(req: Request, res: Response) {
    const id = Number(req.params.id);
    const foundedPost = postsRepository.findById(id);

    if(!foundedPost) {
        res.status(HTTPStatus.NOT_FOUND).send("Post not found");
        return;
    }
    const foundBlog = postsRepository.findById(Number(req.body.blogId));
    if(!foundBlog) {
        return res.status(HTTPStatus.NOT_FOUND).send("Blog not found");
    }
    postsRepository.update(id, req.body);
    res.sendStatus(HTTPStatus.OK);
}