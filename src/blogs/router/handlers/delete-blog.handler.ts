import {Request, Response} from 'express';
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsRepository} from "../../repositories/blogs.repository";
import {createErrorMessages} from "../../../core/validation/input-validation-result.middleware";
export async function deleteBlogHandler(
    req: Request,
    res: Response,
){
    try {
        const id = req.params.id as string;
        const blog = await BlogsRepository.findByID(id);
        if (!blog) {
            res.status(HTTPStatus.NOT_FOUND).send("Такого блога нет").send(createErrorMessages([{ field: 'id', message: 'Blog not found' }]));
            return;
        }
        await BlogsRepository.delete(id);
        res.sendStatus(HTTPStatus.NO_CONTENT);
    }
    catch (e){
        res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
}
