import { AuthMiddleware } from "./auth.middleware";
import express from "express";
import { join } from "path";
import cookieParser from "cookie-parser";

import { FOLDER_SAVE_STATIC_FILE } from "../config";

export default async (app) => {
    app.use(cookieParser());
    app.use(express.json())

    // middlewares for static file: images
    app.use(express.static(join(__dirname, `./${FOLDER_SAVE_STATIC_FILE}`)));

    // middlewares for parse authorization token
    let authMiddleware = new AuthMiddleware();
    app.use(authMiddleware.auth.bind(authMiddleware));
};
