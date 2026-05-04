import {Request, Response} from "express";
import {db} from "../../../db/db";
import {PostsType} from "../../types/posts";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsRepository} from "../../../blogs/repositories/blogs.repository";

    export function createPostHandler(req: Request, res: Response) {
        const foundBlog = BlogsRepository.findByID(Number(req.body.blogId));
        if(!foundBlog) {
            res.status(404).send("No blog found.");
            return;
        }
        const newPost: PostsType = {
            id: db.posts.length ? String(Number(db.posts[db.posts.length - 1].id) + 1) : "1",
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: foundBlog.name
        };
        postsRepository.create(newPost);
        res.status(HTTPStatus.CREATED).send(newPost);
    }