import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {postsService} from "../../application/posts.service";

export async function deletePostHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        await postsService.delete(id);
        res.sendStatus(HTTPStatus.NO_CONTENT);
    }
    catch(err){
        res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
}
