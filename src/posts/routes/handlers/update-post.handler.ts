import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsRepository} from "../../../blogs/repositories/blogs.repository";
import {postsService} from "../../application/posts.service";
import {blogsService} from "../../../blogs/application/blogs.service";



export async function updatePostHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        await postsService.update(req.body, id);
        res.sendStatus(HTTPStatus.NO_CONTENT);
    }
    catch (e) {
        res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
    }

}