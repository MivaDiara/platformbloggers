import {Request, Response} from "express";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsRepository} from "../../repositories/blogs.repository";
import {createErrorMessages} from "../../../core/validation/input-validation-result.middleware";

export function updateBlogHandler(req: Request, res: Response) {
    const id = Number(req.params.id);
    let foundBlog = BlogsRepository.findByID(id);
    if (!foundBlog) {
        res.status(HTTPStatus.NOT_FOUND).send("Такого блога нет").send(createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]));
        return;
    }
    BlogsRepository.update(id, req.body);
    res.sendStatus(HTTPStatus.OK);
}