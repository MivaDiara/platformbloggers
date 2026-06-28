import {Request, Response} from "express";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {blogsService} from "../../application/blogs.service";

export async function updateBlogHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        await blogsService.update(id, req.body);
        res.sendStatus(HTTPStatus.NO_CONTENT);
    }
    catch(err){
        res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
}