import {BlogsRepository} from "../repositories/blogs.repository";
import {BlogsInputDTO} from "../dto/blogs.input-dto";
import {BlogsType} from "../types/blogs";
import {BlogQueryInput} from "../input/blog-query.input";
import {ObjectId, WithId} from "mongodb";
import {PostsType} from "../../posts/types/posts";
import {postsRepository} from "../../posts/repositories/posts.repository";
import {PostsInBlogInputDto} from "../../posts/dto/post-input-in-blog.dto";
import {PostQueryInput} from "../../posts/input/post-query.input";
import {blogsCollection, postCollection} from "../../db/db";

export const blogsService = {
    async findMany(queryDto: BlogQueryInput): Promise<{items: WithId<BlogsType>[]; totalCount: number}> {
        return await BlogsRepository.findAll(queryDto);
    },
    async findOneOrFail(id: string){
        return await BlogsRepository.findByIdOrFail(id)
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
    async findPosts(queryDto: PostQueryInput, id:string): Promise<{items: WithId<PostsType>[], totalCount: number}>{
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchPostTitleTerm
        } = queryDto;
        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {"blogId": `${id}`};
        if (searchPostTitleTerm){
            filter.$or = [];
            if (searchPostTitleTerm){
                filter.$or.push({ "title": { "$regex": `${searchPostTitleTerm}`, "$options": "i" } });
            }
        }
        const items = await postCollection
            .find(filter)
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .limit(pageSize)
            .toArray();
        const totalCount = await postCollection.countDocuments(filter);
        return {items, totalCount};
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