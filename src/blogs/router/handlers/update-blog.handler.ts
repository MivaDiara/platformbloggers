import {Request, Response} from "express";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {blogsService} from "../../application/blogs.service";
import {RepositoryNotFoundError} from "../../../core/errors/repository-not-found-error";
import {blogsQueryRepository} from "../../repositories/query.repository";

export async function updateBlogHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        await blogsQueryRepository.findByIdOrFail(id);
        await blogsService.update(id, req.body);
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