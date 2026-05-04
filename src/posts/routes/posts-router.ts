import {Router} from "express";
import {idValidation} from "../../core/validation/params-id.validation-middleware";
import {createPostHandler} from "./handlers/create-post.handler";
import {inputValidationResultMiddleware} from "../../core/validation/input-validation-result.middleware";
import {getListsPostHandler} from "./handlers/getList-post.handler";
import {getPostHandler} from "./handlers/get-post.handler";
import {updatePostHandler} from "./handlers/update-post.handler";
import {deletePostHandler} from "./handlers/delete-post.handler";
import {postInputDtoValidation} from "../validation/post.dto-validation";
import {superAdminGuardMiddleWare} from "../../auth/middlewares/super-admin.guard-middleware.";

export const postsRouter = Router();

postsRouter
.get("", getListsPostHandler )
.get("/:id", idValidation, inputValidationResultMiddleware, getPostHandler)
.post("",superAdminGuardMiddleWare, postInputDtoValidation, inputValidationResultMiddleware, createPostHandler)
.put("/:id", superAdminGuardMiddleWare, idValidation, postInputDtoValidation ,inputValidationResultMiddleware, updatePostHandler)
.delete("/:id", superAdminGuardMiddleWare, idValidation, deletePostHandler);