"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const db_1 = require("../../db/db");
const blogs_repository_1 = require("../../blogs/repositories/blogs.repository");
exports.postsRepository = {
    findAll() {
        return db_1.db.posts;
    },
    findById(id) {
        var _a;
        return (_a = db_1.db.posts.find(v => Number(v.id) === id)) !== null && _a !== void 0 ? _a : null;
    },
    create(newPost) {
        db_1.db.posts.push(newPost);
        return newPost;
    },
    update(id, dto) {
        const post = db_1.db.posts.find(v => Number(v.id) === id);
        if (!post) {
            throw new Error('No such post');
        }
        post.title = dto.title;
        post.content = dto.content;
        post.shortDescription = dto.shortDescription;
        post.blogId = dto.blogId;
        const blog = dto.blogId ? blogs_repository_1.BlogsRepository.findByID(Number(dto.blogId)) : null;
        post.blogName = blog ? blog.name : "no blog id";
        return;
    },
    delete(id) {
        const foundIndex = db_1.db.posts.findIndex(v => Number(v.id) === id);
        db_1.db.posts.splice(foundIndex, 1);
        return;
    }
};
