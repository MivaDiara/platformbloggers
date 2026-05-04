"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsRepository = void 0;
const db_1 = require("../../db/db");
exports.BlogsRepository = {
    findAll() {
        return db_1.db.blogs;
    },
    findByID(id) {
        var _a;
        return (_a = db_1.db.blogs.find(v => Number(v.id) === id)) !== null && _a !== void 0 ? _a : null;
    },
    create(newBlog) {
        db_1.db.blogs.push(newBlog);
        return newBlog;
    },
    update(id, dto) {
        const blog = db_1.db.blogs.find(v => Number(v.id) === id);
        if (!blog) {
            throw new Error('Blog not exist');
        }
        blog.name = dto.name;
        blog.description = dto.description;
        blog.websiteUrl = dto.websiteUrl;
        return;
    },
    delete(id) {
        const index = db_1.db.blogs.findIndex(v => Number(v.id) === id);
        db_1.db.blogs.splice(index, 1);
        return;
    }
};
