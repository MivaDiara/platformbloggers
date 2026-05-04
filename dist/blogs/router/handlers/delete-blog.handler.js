"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogHandler = deleteBlogHandler;
const HTTPStatus_1 = require("../../../core/types/HTTPStatus");
const blogs_repository_1 = require("../../repositories/blogs.repository");
function deleteBlogHandler(req, res) {
    const id = Number(req.params.id);
    const blog = blogs_repository_1.BlogsRepository.findByID(id);
    if (!blog) {
        res.status(HTTPStatus_1.HTTPStatus.NOT_FOUND).send("Блог не найден");
        return;
    }
    blogs_repository_1.BlogsRepository.delete(id);
    res.status(HTTPStatus_1.HTTPStatus.NO_CONTENT);
}
