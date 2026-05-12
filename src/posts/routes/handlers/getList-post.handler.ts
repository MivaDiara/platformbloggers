import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {mapToPostViewModel} from "../../mapping/maps-to-post-view";

export async function getListsPostHandler(req: Request, res: Response) {
    try{
        const posts = await postsRepository.findAll();
        const postsViewModel = posts.map(mapToPostViewModel);
        res.status(HTTPStatus.OK).send(postsViewModel);
    }
    catch(error){
        res.sendStatus(HTTPStatus.NOT_FOUND);
    }
}