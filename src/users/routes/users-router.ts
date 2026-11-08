import {Router} from "express";
import {createPostHandler} from "../../posts/routes/handlers/create-post.handler";
import {getUsersHandler} from "./handlers/getList-user.handler";
import {createUserHandler} from "./handlers/create-user.handler";
import {getUserHandler} from "./handlers/get-user.handler";
import {deleteUserHandler} from "./handlers/delete-user.handler";
import {idValidation} from "../../core/validation/params-id.validation-middleware";
import {userInputDtoValidation} from "../validation/user.dto-validation";
import {inputValidationResultMiddleware} from "../../core/validation/input-validation-result.middleware";

export const usersRouter = Router();

usersRouter
.get("", getUsersHandler)
.post("", userInputDtoValidation, inputValidationResultMiddleware, createUserHandler)
.get("/:id", idValidation, getUserHandler)
.delete("/:id", deleteUserHandler);