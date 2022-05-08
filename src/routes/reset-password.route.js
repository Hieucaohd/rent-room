import express from 'express';
import { FRONTEND_HOSTNAME, VERIFIED_PASSWORD_SECRET_KEY } from '../config/index';
import {
    sendResetPasswordMail,
    verifyResetPasswordMail,
} from '../services/helpers/reset-password.service';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/send', async (req, res) => {
    try {
        const { email } = req.body;
        await sendResetPasswordMail(FRONTEND_HOSTNAME, email);
        res.json({ email });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { email } = jwt.verify(token, VERIFIED_PASSWORD_SECRET_KEY);
        const { password } = req.body;
        await verifyResetPasswordMail(email, password);
        res.json({ email });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

export default router;
