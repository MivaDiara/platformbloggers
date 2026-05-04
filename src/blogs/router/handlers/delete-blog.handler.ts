import {Request, Response} from 'express';
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsRepository} from "../../repositories/blogs.repository";
export function deleteBlogHandler(
    req: Request,
    res: Response,
){
        const id = Number(req.params.id);
        const blog = BlogsRepository.findByID(id);
        if (!blog) {
            res.status(HTTPStatus.NOT_FOUND).send("Блог не найден");
            return;
        }
        BlogsRepository.delete(id);
        res.status(HTTPStatus.NO_CONTENT);
}
