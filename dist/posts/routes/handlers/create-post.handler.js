"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostHandler = createPostHandler;
const db_1 = require("../../../db/db");
const posts_repository_1 = require("../../repositories/posts.repository");
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
const blogs_repository_1 = require("../../../blogs/repositories/blogs.repository");
function createPostHandler(req, res) {
    const foundBlog = blogs_repository_1.BlogsRepository.findByID(Number(req.body.blogId));
    if (!foundBlog) {
        res.status(404).send("No blog found.");
        return;
    }
    const newPost = {
        id: db_1.db.posts.length ? String(Number(db_1.db.posts[db_1.db.posts.length - 1].id) + 1) : "1",
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: foundBlog.name
    };
    posts_repository_1.postsRepository.create(newPost);
    res.status(HTTPStatus_1.HTTPStatus.CREATED).send(newPost);
}
