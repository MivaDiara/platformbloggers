import {Request, Response} from 'express';
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsRepository} from "../../repositories/blogs.repository";
import {createErrorMessages} from "../../../core/validation/input-validation-result.middleware";
export function deleteBlogHandler(
    req: Request,
    res: Response,
){
        const id = Number(req.params.id);
        const blog = BlogsRepository.findByID(id);
        if (!blog) {
            res.status(HTTPStatus.NOT_FOUND).send("Такого блога нет").send(createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]));
            return;
        }
        BlogsRepository.delete(id);
        res.sendStatus(HTTPStatus.NO_CONTENT);
}
