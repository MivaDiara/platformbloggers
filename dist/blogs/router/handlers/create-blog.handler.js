"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogHandler = createBlogHandler;
const db_1 = require("../../../db/db");
const blogs_repository_1 = require("../../repositories/blogs.repository");
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
function createBlogHandler(req, res, next) {
    const newBlog = {
        id: db_1.db.blogs.length ? String(Number(db_1.db.blogs[db_1.db.blogs.length - 1].id) + 1) : "1",
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl
    };
    blogs_repository_1.BlogsRepository.create(newBlog);
    res.status(HTTPStatus_1.HTTPStatus.CREATED).send(newBlog);
}
