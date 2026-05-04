import {PostsInputDTO} from "../dto/posts.input-dto";
import {PostsType} from "../types/posts";
import {db} from "../../db/db";
import {BlogsRepository} from "../../blogs/repositories/blogs.repository";


export const postsRepository = {
    findAll(): PostsType[]{
        return db.posts;
    },
    findById(id: number): PostsType | null{
        return db.posts.find(v => Number(v.id) === id) ?? null;
    },
    create(newPost: PostsType): PostsType {
        db.posts.push(newPost);
        return newPost;
    },
    update(id: number, dto: PostsInputDTO): void{
        const post = db.posts.find(v => Number(v.id) === id);
        if (!post) {
            throw new Error('No such post');
        }
        post.title = dto.title;
        post.content = dto.content;
        post.shortDescription = dto.shortDescription;
        post.blogId = dto.blogId;
        const blog = dto.blogId ? BlogsRepository.findByID(Number(dto.blogId)) : null;
        post.blogName = blog ? blog.name : "no blog id";
        return;
    },
    delete(id: number): void{
        const foundIndex = db.posts.findIndex(v => Number(v.id) === id);
        db.posts.splice(foundIndex, 1);
        return
    }
};