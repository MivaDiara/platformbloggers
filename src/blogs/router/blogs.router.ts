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

export const blogsRouter = Router();

blogsRouter
.get('', getBlogListHandler)
.get('/:id',idValidation, inputValidationResultMiddleware, getBlogHandler)
.post('', superAdminGuardMiddleWare, blogInputDtoValidation, inputValidationResultMiddleware, createBlogHandler)
.delete('/:id', superAdminGuardMiddleWare ,idValidation, inputValidationResultMiddleware, deleteBlogHandler)
.put('/:id', superAdminGuardMiddleWare, idValidation, blogInputDtoValidation, inputValidationResultMiddleware, updateBlogHandler);