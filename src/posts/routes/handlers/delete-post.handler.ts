import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";

export async function deletePostHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const post = await postsRepository.findById(id);
        if(!post) {
            res.status(HTTPStatus.NOT_FOUND).send("Post not found");
            return;
        }
        await postsRepository.delete(id);

        res.sendStatus(HTTPStatus.NO_CONTENT);
    }
    catch(err){
        res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
}
