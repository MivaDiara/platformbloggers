import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts.repository";
import {HTTPStatus} from "../../../core/types/HTTPStatus";
import {mapToPostViewModel} from "../../mapping/maps-to-post-view";
import {BlogsRepository} from "../../../blogs/repositories/blogs.repository";

export async function getListsPostHandler(req: Request, res: Response) {
    try{
        const posts = await postsRepository.findAll();
        const postsViewModel = await Promise.all(posts.map( async (post) =>{
                const blog = await BlogsRepository.findByID(post.blogId.toString());
                if (!blog){
                    res.status(HTTPStatus.NOT_FOUND).send("Blog not found");
                    return;
                }
                return mapToPostViewModel(post, blog);
        }
           ));
        res.status(HTTPStatus.OK).send(postsViewModel);
    }
    catch(error){
        res.sendStatus(HTTPStatus.NOT_FOUND);
    }
}