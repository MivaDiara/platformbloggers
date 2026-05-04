"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostHandler = deletePostHandler;
const posts_repository_1 = require("../../repositories/posts.repository");
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
function deletePostHandler(req, res) {
    const id = Number(req.params.id);
    const post = posts_repository_1.postsRepository.findById(id);
    if (!post) {
        res.status(HTTPStatus_1.HTTPStatus.NOT_FOUND).send("Post not found");
        return;
    }
    posts_repository_1.postsRepository.delete(id);
    res.status(HTTPStatus_1.HTTPStatus.OK);
}
