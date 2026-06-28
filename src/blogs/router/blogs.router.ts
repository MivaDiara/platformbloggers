import {Router} from "express";
import {idValidation} from "../../core/validation/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/validation/input-validation-result.middleware";
import {createBlogHandler} from "./handlers/create-blog.handler";
import {getBlogListHandler} from "./handlers/get-bloglist.handler";
import {getBlogHandler} from "./handlers/get-blog.handler";
import {deleteBlogHandler} from "./handlers/delete-blog.handler";
import {updateBlogHandler} from "./handlers/update-blog.handler";
import {blogInputDtoValidation} from "../validation/blog.dto-validation";
import {superAdminGuardMiddleWare} from "../../auth/middlewares/super-admin.guard-middleware.";
import {BlogSortField} from "../input/blog-sort-field";
import {getPostsInBlogHandler} from "./handlers/get-posts-in-blogs.handler";
import {createPostsInBlogHandler} from "./handlers/create-posts-in-blogs.handler";
import {paginationAndSortingValidation} from "../../core/validation/query-pagination-sorting";
import {PostSortField} from "../../posts/input/post-sort-field";
import {blogQueryValidation} from "../validation/query-search-validation";

export const blogsRouter = Router();

blogsRouter
.get('', blogQueryValidation,getBlogListHandler)
.get('/:id',idValidation, inputValidationResultMiddleware, getBlogHandler)
.post('', superAdminGuardMiddleWare, blogInputDtoValidation, inputValidationResultMiddleware, createBlogHandler)
.delete('/:id', superAdminGuardMiddleWare ,idValidation, inputValidationResultMiddleware, deleteBlogHandler)
.put('/:id', superAdminGuardMiddleWare, idValidation, blogInputDtoValidation, inputValidationResultMiddleware, updateBlogHandler)
.get('/:id/posts', idValidation, paginationAndSortingValidation(PostSortField), inputValidationResultMiddleware, getPostsInBlogHandler)
.post('/:id/posts', idValidation, inputValidationResultMiddleware, createPostsInBlogHandler);