"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostHandler = updatePostHandler;
const posts_repository_1 = require("../../repositories/posts.repository");
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
const blogs_repository_1 = require("../../../blogs/repositories/blogs.repository");
function updatePostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const foundedPost = posts_repository_1.postsRepository.findById(id);
            if (!foundedPost) {
                res.status(HTTPStatus_1.HTTPStatus.NOT_FOUND).send("Post not found");
                return;
            }
            const foundBlog = blogs_repository_1.BlogsRepository.findByID(req.body.blogId.toString());
            if (!foundBlog) {
                return res.status(HTTPStatus_1.HTTPStatus.NOT_FOUND).send("Blog not found");
            }
            yield posts_repository_1.postsRepository.update(id, req.body);
            res.sendStatus(HTTPStatus_1.HTTPStatus.NO_CONTENT);
        }
        catch (e) {
            res.sendStatus(HTTPStatus_1.HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    });
}
