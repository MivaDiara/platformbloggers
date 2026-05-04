"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const params_id_validation_middleware_1 = require("../../core/validation/params-id.validation-middleware");
const create_post_handler_1 = require("./handlers/create-post.handler");
const input_validation_result_middleware_1 = require("../../core/validation/input-validation-result.middleware");
const getList_post_handler_1 = require("./handlers/getList-post.handler");
const get_post_handler_1 = require("./handlers/get-post.handler");
const update_post_handler_1 = require("./handlers/update-post.handler");
const delete_post_handler_1 = require("./handlers/delete-post.handler");
const post_dto_validation_1 = require("../validation/post.dto-validation");
const super_admin_guard_middleware_1 = require("../../auth/middlewares/super-admin.guard-middleware.");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter
    .get("", getList_post_handler_1.getListsPostHandler)
    .get("/:id", params_id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, get_post_handler_1.getPostHandler)
    .post("", super_admin_guard_middleware_1.superAdminGuardMiddleWare, post_dto_validation_1.postInputDtoValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, create_post_handler_1.createPostHandler)
    .put("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleWare, params_id_validation_middleware_1.idValidation, post_dto_validation_1.postInputDtoValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, update_post_handler_1.updatePostHandler)
    .delete("/:id", super_admin_guard_middleware_1.superAdminGuardMiddleWare, params_id_validation_middleware_1.idValidation, delete_post_handler_1.deletePostHandler);
