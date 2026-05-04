import {Request, Response} from 'express';
import {BlogsRepository} from "../../repositories/blogs.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";

export function getBlogHandler(req: Request, res: Response) {
    const id = Number(req.params.id);
    const blog = BlogsRepository.findByID(id);
    if (!blog) {
        res.status(HTTPStatus.NOT_FOUND).send('No blog found');
        return;
    }
    res.send(blog);
}