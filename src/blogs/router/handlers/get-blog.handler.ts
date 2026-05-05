import {Request, Response} from 'express';
import {BlogsRepository} from "../../repositories/blogs.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {createErrorMessages} from "../../../core/validation/input-validation-result.middleware";

export function getBlogHandler(req: Request, res: Response) {
    const id = Number(req.params.id);
    const blog = BlogsRepository.findByID(id);
    if (!blog) {
        res.status(HTTPStatus.NOT_FOUND).send("Такого блога нет").send(createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]));
        return;
    }
    res.send(blog);
}