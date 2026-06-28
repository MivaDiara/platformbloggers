import {BlogsRepository} from "../repositories/blogs.repository";
import {BlogsInputDTO} from "../dto/blogs.input-dto";
import {BlogsType} from "../types/blogs";
import {BlogQueryInput} from "../input/blog-query.input";
import {WithId} from "mongodb";
import {PostsType} from "../../posts/types/posts";
import {postsRepository} from "../../posts/repositories/posts.repository";
import {PostsInBlogInputDto} from "../../posts/dto/post-input-in-blog.dto";

export const blogsService = {
    async findMany(queryDto: BlogQueryInput): Promise<{items: WithId<BlogsType>[]; totalCount: number}> {
        return await BlogsRepository.findAll(queryDto);
    },
    async findOneOrFail(id: string) {
        return await BlogsRepository.findByID(id)
    },
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
    async findPosts(id:string): Promise<WithId<PostsType>[]>{
        return await postsRepository.findAllInBlogs(id);
    },
    async createPost(id: string, dto: PostsInBlogInputDto): Promise<string> {
        const foundBlog = await BlogsRepository.findByIdOrFail(id);
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