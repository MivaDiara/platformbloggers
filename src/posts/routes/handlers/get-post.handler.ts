import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";

export function getPostHandler(req: Request, res: Response) {
    const id = Number(req.params.id);
    const post = postsRepository.findById(id);
    res.status(HTTPStatus.OK).json(post);
}