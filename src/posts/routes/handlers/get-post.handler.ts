import {Request, Response} from "express";

import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {mapToPostViewModel} from "../../mapping/maps-to-post-view";
import {postsService} from "../../application/posts.service";
import {blogsService} from "../../../blogs/application/blogs.service";

export async function getPostHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const post = await postsService.findOneOrFail(id);
        const blog = await blogsService.findOneOrFail(post!.blogId.toString());
        const postMapping = mapToPostViewModel(post!, blog!);
        res.status(HTTPStatus.OK).json(postMapping);
    }
    catch(e){
        res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
    }
}