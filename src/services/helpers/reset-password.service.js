import { TIME_VERIFIED_TOKEN_EXPIRED, VERIFIED_PASSWORD_SECRET_KEY } from "../../config/index";
import jwt from "jsonwebtoken";
import emailService from "./mail.service";
import { findUserByEmail } from "../model-services/user.service";

export const sendResetPasswordMail = async (hostName, email) => {
    const user = await findUserByEmail(email);

    if(!user) throw new error("Tài khoản này không tồn tại");

    const verifyToken = await jwt.sign(
        {
            email
        },
        VERIFIED_PASSWORD_SECRET_KEY,
        { expiresIn: TIME_VERIFIED_TOKEN_EXPIRED }
    );
    const resetPasswordLink = hostName + '/forgot/' + verifyToken;

    await emailService.send({
        to: email,
        subject: 'Đổi mật khẩu',
        text: 'Bấm link dưới đây để đổi mật khẩu' + resetPasswordLink,
        html: `<b>Bấm link dưới đây để đổi mật khẩu <br> ${resetPasswordLink} </b>`,
    });

    return email;
};

export const verifyResetPasswordMail = async (email, newPassword) => {
    const hashPassword = await hash(newPassword, 10)
    return await User.findOneAndUpdate({ email }, {
        password: hashPassword
    });
};