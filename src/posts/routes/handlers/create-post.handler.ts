import {Request, Response} from "express";
import {PostsType} from "../../types/posts";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsRepository} from "../../../blogs/repositories/blogs.repository";
import {mapToPostViewModel} from "../../mapping/maps-to-post-view";
import {blogsService} from "../../../blogs/application/blogs.service";
import {postsService} from "../../application/posts.service";

    export async function createPostHandler(req: Request, res: Response) {
        try {
            const foundBlog = await blogsService.findOneOrFail(req.body.blogId.toString());
            const createdPostId = await postsService.create(req.body);
            const createdPost = await postsService.findOneOrFail(createdPostId);
            const postViewModel = mapToPostViewModel(createdPost!, foundBlog!);
            res.status(HTTPStatus.CREATED).send(postViewModel);
        }
        catch (e){
            res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }