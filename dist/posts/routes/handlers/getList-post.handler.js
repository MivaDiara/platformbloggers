"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListsPostHandler = getListsPostHandler;
const posts_repository_1 = require("../../repositories/posts.repository");
function getListsPostHandler(req, res) {
    const posts = posts_repository_1.postsRepository.findAll();
    res.json(posts);
}
