"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogHandler = getBlogHandler;
const blogs_repository_1 = require("../../repositories/blogs.repository");
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
function getBlogHandler(req, res) {
    const id = Number(req.params.id);
    const blog = blogs_repository_1.BlogsRepository.findByID(id);
    if (!blog) {
        res.status(HTTPStatus_1.HTTPStatus.NOT_FOUND).send('No blog found');
        return;
    }
    res.send(blog);
}
