import {PostsInputDTO} from "../dto/posts.input-dto";
import {postsRepository} from "../repositories/posts.repository";
import {PostsType} from "../types/posts";
import {blogsService} from "../../blogs/application/blogs.service";
import {PostQueryInput} from "../input/post-query.input";
import {WithId} from "mongodb";

export const postsService = {
    async findMany(queryDto: PostQueryInput): Promise<{items: WithId<PostsType>[], totalCount: number}>{
        return await postsRepository.findAll(queryDto);
    },
    async findOneOrFail(id:string){
        return await postsRepository.findByIdOrFail(id);
    },
    async create(dto: PostsInputDTO): Promise<string>{
        const foundBlog = await blogsService.findOneOrFail(dto.blogId);
        const createdPost: PostsType = {
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: dto.blogId,
            createdAt: new Date().toDateString(),
            blogName: foundBlog!.name
        }
        return await postsRepository.create(createdPost)
    },
    async update(dto: PostsInputDTO, id: string): Promise<void>{
        await postsRepository.update(id, dto);
        return;
    },
    async delete(id: string): Promise<void>{
        await postsRepository.delete(id);
        return;
    },
}