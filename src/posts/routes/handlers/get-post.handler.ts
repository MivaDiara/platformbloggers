import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {mapToPostViewModel} from "../../mapping/maps-to-post-view";

export async function getPostHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const post = await postsRepository.findById(id);
        if(!post) {
            res.status(HTTPStatus.NOT_FOUND).send("Post not found");
            return;
        }
        const postMapping = mapToPostViewModel(post);
        res.status(HTTPStatus.OK).json(postMapping);
    }
    catch(e){

    }
}