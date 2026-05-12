import {Request, Response} from 'express';
import {BlogsRepository} from "../../repositories/blogs.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {createErrorMessages} from "../../../core/validation/input-validation-result.middleware";
import {mapToBlogViewModel} from "../../mapping/maps-to-blogs-to-view";

export async function getBlogHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const blog = await BlogsRepository.findByID(id);
        if (!blog) {
            res.status(HTTPStatus.NOT_FOUND).send("Такого блога нет").send(createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]));
            return;
        }
        const blogViewModel = mapToBlogViewModel(blog);
        res.send(blogViewModel);
    }
    catch(err){
        res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
}