import {Request, Response} from "express";

import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {mapToPostViewModel} from "../../mapping/maps-to-post-view";
import {postsService} from "../../application/posts.service";
import {blogsService} from "../../../blogs/application/blogs.service";
import {RepositoryNotFoundError} from "../../../core/errors/repository-not-found-error";
import {postsQueryRepository} from "../../repositories/query.reporitory";
import {blogsQueryRepository} from "../../../blogs/repositories/query.repository";

export async function getPostHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const post = await postsQueryRepository.findByIdOrFail(id);
        const blog = await blogsQueryRepository.findByIdOrFail(post!.blogId.toString());
        const postMapping = mapToPostViewModel(post!, blog!);
        res.status(HTTPStatus.OK).json(postMapping);
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