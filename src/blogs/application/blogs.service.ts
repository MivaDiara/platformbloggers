import {BlogsRepository} from "../repositories/blogs.repository";
import {BlogsInputDTO} from "../dto/blogs.input-dto";
import {BlogsType} from "../types/blogs";
import {PostsType} from "../../posts/types/posts";
import {postsRepository} from "../../posts/repositories/posts.repository";
import {PostsInBlogInputDto} from "../../posts/dto/post-input-in-blog.dto";
import {blogsQueryRepository} from "../repositories/query.repository";

export const blogsService = {
    async create(dto: BlogsInputDTO): Promise<string> {
        const createdBlog: BlogsType = {
            name: dto.name,
            description: dto.description,
            websiteUrl: dto.websiteUrl,
            createdAt: new Date().toISOString(),
            isMemberShip: false
        }
        return await BlogsRepository.create(createdBlog);
    },
    async update(id: string,dto:BlogsInputDTO): Promise<void> {
        await BlogsRepository.update(id,dto);
        return;
    },
    async delete(id: string): Promise<void> {
        await BlogsRepository.delete(id);
        return;
    },
    async createPost(id: string, dto: PostsInBlogInputDto): Promise<string> {
        const foundBlog = await blogsQueryRepository.findByIdOrFail(id);
        const createdPost: PostsType = {
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: id,
            createdAt: new Date().toISOString(),
            blogName: foundBlog!.name
        }
        return await postsRepository.create(createdPost);
    }
}