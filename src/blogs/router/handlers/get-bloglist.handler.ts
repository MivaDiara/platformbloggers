import {Response, Request} from 'express';
import {BlogsRepository} from "../../repositories/blogs.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {mapToBlogViewModel} from "../../mapping/maps-to-blogs-to-view";


export async function getBlogListHandler(
    req: Request, res: Response
){
    try{
        const blogs = await BlogsRepository.findAll();
        const blogsViewModel = blogs.map(mapToBlogViewModel);
        res.status(HTTPStatus.OK).send(blogsViewModel);
    }
    catch(error){
        res.sendStatus(HTTPStatus.NOT_FOUND);
    }
}