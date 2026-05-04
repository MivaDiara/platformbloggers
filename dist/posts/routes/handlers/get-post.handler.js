"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostHandler = getPostHandler;
const posts_repository_1 = require("../../repositories/posts.repository");
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
function getPostHandler(req, res) {
    const id = Number(req.params.id);
    const post = posts_repository_1.postsRepository.findById(id);
    res.status(HTTPStatus_1.HTTPStatus.OK).json(post);
}
