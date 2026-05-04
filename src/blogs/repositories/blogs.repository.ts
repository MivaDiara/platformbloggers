import {BlogsType} from "../types/blogs";
import {db} from "../../db/db";
import {BlogsInputDTO} from "../dto/blogs.input-dto";


export const BlogsRepository = {
    findAll(): BlogsType[] {
        return db.blogs;
    },
    findByID(id: number): BlogsType | null {
        return db.blogs.find(v => Number(v.id) === id) ?? null;
    },
    create(newBlog: BlogsType): BlogsType {
            db.blogs.push(newBlog);
            return newBlog;
        },
    update(id: number, dto: BlogsInputDTO): void {
        const blog = db.blogs.find(v => Number(v.id) === id);
        if (!blog) {
            throw new Error('Blog not exist');
        }
        blog.name = dto.name;
        blog.description = dto.description;
        blog.websiteUrl = dto.websiteUrl;
        return;
    },
    delete(id: number): void {
        const index = db.blogs.findIndex(v => Number(v.id) === id);
        db.blogs.splice(index, 1);
        return
    }
}