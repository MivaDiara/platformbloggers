import {NextFunction, Request, Response} from "express";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {blogsService} from "../../application/blogs.service";
import {postsService} from "../../../posts/application/posts.service";
import {mapToPostViewModel} from "../../../posts/mapping/maps-to-post-view";
import {RepositoryNotFoundError} from "../../../core/errors/repository-not-found-error";

export async function createPostsInBlogHandler(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const foundBlog = await blogsService.findOneOrFail(id);
        const createdPostId = await blogsService.createPost(id, req.body);
        const createdPost = await postsService.findOneOrFail(createdPostId);
        const postViewModel = mapToPostViewModel(createdPost!, foundBlog!);
        res.status(HTTPStatus.CREATED).send(postViewModel);
    }
    catch(err){
        if(err instanceof RepositoryNotFoundError) {
            res.status(HTTPStatus.NOT_FOUND);
        }
        else{
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }
}