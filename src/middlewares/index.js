import { AuthMiddleware } from "./auth";
import express from "express";
import { join } from "path";
import cookieParser from "cookie-parser";

import { FOLDER_SAVE_FILE } from "../config";

export default async (app) => {
    app.use(cookieParser());

    // middlewares for static file: images
    app.use(express.static(join(__dirname, `./${FOLDER_SAVE_FILE}`)));

    let authMiddleware = new AuthMiddleware();

    // middlewares for parse authorization token
    app.use(authMiddleware.auth.bind(authMiddleware));
};
