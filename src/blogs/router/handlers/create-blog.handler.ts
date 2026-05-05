import {NextFunction, Request, Response} from "express";
import {BlogsType} from "../../types/blogs";
import {db} from "../../../db/db";
import {BlogsRepository} from "../../repositories/blogs.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {BlogsInputDTO} from "../../dto/blogs.input-dto";

export function createBlogHandler(
    req: Request<{}, {}, BlogsInputDTO>, res: Response, next: NextFunction
){
    const newBlog: BlogsType = {
        id: db.blogs.length ? String(db.blogs[db.blogs.length - 1].id + 1) : "1",
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    }
    BlogsRepository.create(newBlog);
    res.status(HTTPStatus.CREATED).send(newBlog);
}