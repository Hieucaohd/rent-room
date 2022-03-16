import { sign } from "jsonwebtoken";
import { pick } from "lodash";
import { SECRET, SECRET_REFRESH } from "../config";
import dayjs from "dayjs";

// for test
// const timeExpiredAccessToken = 1;
// const timeExpiredRefreshToken = 5;

const timeExpiredAccessToken = 60 * 60 * 24 * 7;
const timeExpiredRefreshToken = 60 * 60 * 24 * 365;
const timeExpiredCookieAccessToken = dayjs().add(7, "days").toDate();
const timeExpiredCookieRefreshToken = dayjs().add(365, "days").toDate();

export const issueAccessToken = async (user) => {
    let token = await sign(user, SECRET, {
        expiresIn: timeExpiredAccessToken,
    });
    return `Bearer ${token}`;
};

export const issueRefreshToken = async (user) => {
    let refreshToken = await sign(user, SECRET_REFRESH, {
        expiresIn: timeExpiredRefreshToken,
    });

    return `Bearer ${refreshToken}`;
};

export const serializerUser = (user) => {
    return pick(user, [
        "_id",
        "email",
        "fullname",
        "numberPhone",
        "province",
        "district",
        "ward",
        "avatar",
    ]);
};

export const setAccessTokenInCookie = async (res, user) => {
    let token = await issueAccessToken(user);
    let options = {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        expires: timeExpiredCookieAccessToken,
    };
    res.cookie("token", token, options);
};

export const setRefreshTokenInCookie = async (res, user) => {
    let refreshToken = await issueRefreshToken(user);
    let options = {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        expires: timeExpiredCookieRefreshToken,
    };
    res.cookie("refreshToken", refreshToken, options);
};

export const clearAccessTokenInCookie = (res) => {
    res.clearCookie("token");
};

export const clearRefreshTokenInCookie = (res) => {
    res.clearCookie("refreshToken");
};

export const clearTokensInCookie = (res) => {
    clearAccessTokenInCookie(res);
    clearRefreshTokenInCookie(res);
};
