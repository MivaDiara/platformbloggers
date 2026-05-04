"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const paths_1 = require("./core/paths/paths");
const blogs_router_1 = require("./blogs/router/blogs.router");
const posts_router_1 = require("./posts/routes/posts-router");
const setupApp = (app) => {
    app.use(express_1.default.json()); // middleware для парсинга JSON в теле запроса
    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });
    app.use(paths_1.BLOG_PATH, blogs_router_1.blogsRouter);
    app.use(paths_1.POSTS_PATH, posts_router_1.postsRouter);
    return app;
};
exports.setupApp = setupApp;
