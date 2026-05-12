import {Request, Response} from "express";
import {PostsType} from "../../types/posts";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsRepository} from "../../../blogs/repositories/blogs.repository";
import {mapToPostViewModel} from "../../mapping/maps-to-post-view";

    export async function createPostHandler(req: Request, res: Response) {
        try {
            const foundBlog = await BlogsRepository.findByID(req.body.blogId.toString());
            if(!foundBlog) {
                res.status(404).send("No blog found.");
                return;
            }
            const newPost: PostsType = {
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                blogId: req.body.blogId,
                blogName: foundBlog.name
            };
            const createdPost = await postsRepository.create(newPost);
            const postViewModel = mapToPostViewModel(createdPost);
            res.status(HTTPStatus.CREATED).send(postViewModel);
        }
        catch (e){
            res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    }