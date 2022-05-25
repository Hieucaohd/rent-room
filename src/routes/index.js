import { changePasswordRouter } from "./change-password.route";
import { resetPasswordRouter } from "./reset-password.route";
import cors from 'cors';

/**
 * @typedef {import('express').Express} Express
 * @param {Express} app 
 */
export default function applyRouter(app) {
    let feDomain = process.env.FRONTEND_HOSTNAME
    if (feDomain[feDomain.length - 1] == '/') {
        feDomain = feDomain.slice(0, -1)
    }
    app.use(cors({
        credentials: true,
        origin: feDomain
    }));
    app.use('/forgot', resetPasswordRouter)
    app.use('/password', changePasswordRouter)
}