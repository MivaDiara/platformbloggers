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
exports.getPostHandler = getPostHandler;
const posts_repository_1 = require("../../repositories/posts.repository");
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
const maps_to_post_view_1 = require("../../mapping/maps-to-post-view");
const blogs_repository_1 = require("../../../blogs/repositories/blogs.repository");
function getPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const post = yield posts_repository_1.postsRepository.findById(id);
            if (!post) {
                res.status(HTTPStatus_1.HTTPStatus.NOT_FOUND).send("Post not found");
                return;
            }
            const blog = yield blogs_repository_1.BlogsRepository.findByID(post.blogId.toString());
            if (!blog) {
                res.status(HTTPStatus_1.HTTPStatus.NOT_FOUND).send("Blog not found");
                return;
            }
            const postMapping = (0, maps_to_post_view_1.mapToPostViewModel)(post, blog);
            res.status(HTTPStatus_1.HTTPStatus.OK).json(postMapping);
        }
        catch (e) {
        }
    });
}
