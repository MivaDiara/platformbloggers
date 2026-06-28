import {Request, Response} from 'express';
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsRepository} from "../../repositories/blogs.repository";
import {createErrorMessages} from "../../../core/validation/input-validation-result.middleware";
import {blogsService} from "../../application/blogs.service";
import {RepositoryNotFoundError} from "../../../core/errors/repository-not-found-error";
export async function deleteBlogHandler(
    req: Request,
    res: Response,
){
    try {
        const id = req.params.id as string;
        const blog = await blogsService.findOneOrFail(id);
        if(!blog){
            throw new RepositoryNotFoundError("Blog doesnt exist");
        }
        await blogsService.delete(id);
        res.sendStatus(HTTPStatus.NO_CONTENT);
    }
    catch (e){
        res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
}
