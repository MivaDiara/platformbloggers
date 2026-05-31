import {Request, Response} from "express";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsRepository} from "../../repositories/blogs.repository";
import {createErrorMessages} from "../../../core/validation/input-validation-result.middleware";

export async function updateBlogHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        let foundBlog = await BlogsRepository.findByID(id);
        if (!foundBlog) {
            res.status(HTTPStatus.NOT_FOUND).send("Такого блога нет").send(createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]));
            return;
        }
        await BlogsRepository.update(id, req.body);
        res.sendStatus(HTTPStatus.NO_CONTENT);
    }
    catch(err){
        res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
}