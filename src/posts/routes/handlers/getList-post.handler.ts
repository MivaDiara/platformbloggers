import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";

export function getListsPostHandler(req: Request, res: Response) {
    const posts = postsRepository.findAll();
    res.json(posts);
}