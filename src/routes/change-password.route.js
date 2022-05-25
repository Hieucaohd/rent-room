import express from 'express';
import { FRONTEND_HOSTNAME, VERIFIED_PASSWORD_SECRET_KEY } from '../config/index';
import {
    sendResetPasswordMail,
    verifyResetPasswordMail,
} from '../services/helpers/reset-password.service';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { compareSync } from 'bcryptjs';

const router = express.Router();

//middleware

router.post('/change', async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        if (!password || !newPassword) {
            throw new Error('missing field to change password!');
        }
        const user = req.user;
        const canChangePassword = compareSync(password, user.password);
        if (canChangePassword) {
            await verifyResetPasswordMail(user.email, newPassword)
            res.json({
                message: 'change password success',
            });
        } else {
            throw new Error('wrong password!');
        }
        // await verifyResetPasswordMail(email, password);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

export { router as changePasswordRouter };
