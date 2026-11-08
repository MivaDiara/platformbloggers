import {Request, Response} from 'express';
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsRepository} from "../../repositories/blogs.repository";
import {createErrorMessages} from "../../../core/validation/input-validation-result.middleware";
import {blogsService} from "../../application/blogs.service";
import {RepositoryNotFoundError} from "../../../core/errors/repository-not-found-error";
import {blogsQueryRepository} from "../../repositories/query.repository";
export async function deleteBlogHandler(
    req: Request,
    res: Response,
){
    try {
        const id = req.params.id as string;
        const blog = await blogsQueryRepository.findByIdOrFail(id);
        if(!blog){
            throw new RepositoryNotFoundError("Blog doesnt exist");
        }
        await blogsService.delete(id);
        res.sendStatus(HTTPStatus.NO_CONTENT);
    }
    catch (err) {
        if (err instanceof RepositoryNotFoundError) {
            res.status(HTTPStatus.NOT_FOUND).send({error: err});
        } else {
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(`${err}`);
        }
    }
}
