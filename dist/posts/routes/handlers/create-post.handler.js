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
exports.createPostHandler = createPostHandler;
const posts_repository_1 = require("../../repositories/posts.repository");
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
const blogs_repository_1 = require("../../../blogs/repositories/blogs.repository");
const maps_to_post_view_1 = require("../../mapping/maps-to-post-view");
function createPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundBlog = yield blogs_repository_1.BlogsRepository.findByID(req.body.blogId.toString());
            if (!foundBlog) {
                res.status(404).send("No blog found.");
                return;
            }
            const newPost = {
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                blogId: req.body.blogId,
                blogName: foundBlog.name
            };
            const createdPost = yield posts_repository_1.postsRepository.create(newPost);
            const postViewModel = (0, maps_to_post_view_1.mapToPostViewModel)(createdPost);
            res.status(HTTPStatus_1.HTTPStatus.CREATED).send(postViewModel);
        }
        catch (e) {
            res.sendStatus(HTTPStatus_1.HTTPStatus.INTERNAL_SERVER_ERROR);
        }
    });
}
