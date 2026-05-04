import {Response, Request} from 'express';
import {BlogsRepository} from "../../repositories/blogs.repository";


export function getBlogListHandler(
    req: Request, res: Response
){
    const blogs = BlogsRepository.findAll();
    res.send(blogs);
}