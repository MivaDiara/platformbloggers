import express, { Express } from "express";
import {BLOG_PATH, POSTS_PATH, USER_PATH} from "./core/paths/paths";
import {blogsRouter} from "./blogs/router/blogs.router";
import {postsRouter} from "./posts/routes/posts-router";
import { testingRouter } from "./testing/router/testingRouter";
import {usersRouter} from "./users/routes/users-router";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });
    app.use(BLOG_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);
    app.use(USER_PATH, usersRouter);
    app.use('/testing', testingRouter);
    return app;
}