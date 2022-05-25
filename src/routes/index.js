import { changePasswordRouter } from "./change-password.route";
import { resetPasswordRouter } from "./reset-password.route";

/**
 * @typedef {import('express').Express} Express
 * @param {Express} app 
 */
export default function applyRouter(app) {
    app.use('/forgot', resetPasswordRouter)
    app.use('/password', changePasswordRouter)
}