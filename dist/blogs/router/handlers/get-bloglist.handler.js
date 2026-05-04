"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogListHandler = getBlogListHandler;
const blogs_repository_1 = require("../../repositories/blogs.repository");
function getBlogListHandler(req, res) {
    const blogs = blogs_repository_1.BlogsRepository.findAll();
    res.send(blogs);
}
