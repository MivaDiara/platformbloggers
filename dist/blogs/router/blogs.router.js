"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const params_id_validation_middleware_1 = require("../../core/validation/params-id.validation-middleware");
const input_validation_result_middleware_1 = require("../../core/validation/input-validation-result.middleware");
const create_blog_handler_1 = require("./handlers/create-blog.handler");
const get_bloglist_handler_1 = require("./handlers/get-bloglist.handler");
const get_blog_handler_1 = require("./handlers/get-blog.handler");
const delete_blog_handler_1 = require("./handlers/delete-blog.handler");
const update_blog_handler_1 = require("./handlers/update-blog.handler");
const blog_dto_validation_1 = require("../validation/blog.dto-validation");
const super_admin_guard_middleware_1 = require("../../auth/middlewares/super-admin.guard-middleware.");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter
    .get('', get_bloglist_handler_1.getBlogListHandler)
    .get('/:id', params_id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, get_blog_handler_1.getBlogHandler)
    .post('', super_admin_guard_middleware_1.superAdminGuardMiddleWare, blog_dto_validation_1.blogInputDtoValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, create_blog_handler_1.createBlogHandler)
    .delete('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleWare, params_id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, delete_blog_handler_1.deleteBlogHandler)
    .put('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleWare, params_id_validation_middleware_1.idValidation, blog_dto_validation_1.blogInputDtoValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, update_blog_handler_1.updateBlogHandler);
