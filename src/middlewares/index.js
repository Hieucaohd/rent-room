import { authMiddleware } from "./auth";
import express from "express";
import { join } from "path";

import { FOLDER_SAVE_FILE } from "../config";

export default async (app) => {
    // middlewares for static file: images
    app.use(express.static(join(__dirname, `./${FOLDER_SAVE_FILE}`)));

    // middlewares for parse authorization token
    app.use(authMiddleware);
};
