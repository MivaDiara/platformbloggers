import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";

export function deletePostHandler(req: Request, res: Response) {
    const id = Number(req.params.id);
    const post = postsRepository.findById(id);
    if(!post) {
        res.status(HTTPStatus.NOT_FOUND).send("Post not found");
        return;
    }
    postsRepository.delete(id);
    res.status(HTTPStatus.OK);
}
