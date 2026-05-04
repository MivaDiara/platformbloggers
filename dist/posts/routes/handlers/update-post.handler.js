"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostHandler = updatePostHandler;
const posts_repository_1 = require("../../repositories/posts.repository");
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
function updatePostHandler(req, res) {
    const id = Number(req.params.id);
    const foundedPost = posts_repository_1.postsRepository.findById(id);
    if (!foundedPost) {
        res.status(HTTPStatus_1.HTTPStatus.NOT_FOUND).send("Post not found");
        return;
    }
    const foundBlog = posts_repository_1.postsRepository.findById(Number(req.body.blogId));
    if (!foundBlog) {
        return res.status(HTTPStatus_1.HTTPStatus.NOT_FOUND).send("Blog not found");
    }
    posts_repository_1.postsRepository.update(id, req.body);
    res.status(HTTPStatus_1.HTTPStatus.OK);
}
