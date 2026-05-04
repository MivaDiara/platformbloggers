"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogHandler = updateBlogHandler;
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
const blogs_repository_1 = require("../../repositories/blogs.repository");
function updateBlogHandler(req, res) {
    const id = Number(req.params.id);
    let foundBlog = blogs_repository_1.BlogsRepository.findByID(id);
    if (!foundBlog) {
        res.status(HTTPStatus_1.HTTPStatus.NOT_FOUND).send("Такого блога нет");
        return;
    }
    blogs_repository_1.BlogsRepository.update(id, req.body);
    res.status(HTTPStatus_1.HTTPStatus.OK);
}
