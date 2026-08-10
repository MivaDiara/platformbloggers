import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {postsService} from "../../application/posts.service";
import {RepositoryNotFoundError} from "../../../core/errors/repository-not-found-error";

export async function deletePostHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        await postsService.findOneOrFail(id);
        await postsService.delete(id);
        res.sendStatus(HTTPStatus.NO_CONTENT);
    }
    catch(err){
        if(err instanceof RepositoryNotFoundError) {
            res.status(HTTPStatus.NOT_FOUND).send({error: err});
        }
        else{
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(`${err}`);
        }
    }
}
