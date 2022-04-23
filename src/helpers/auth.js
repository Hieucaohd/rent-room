import { sign } from "jsonwebtoken";
import { pick } from "lodash";
import { SECRET, SECRET_REFRESH } from "../config";
import dayjs from "dayjs";
import { User } from "../models";


const TIME_ACCESS_TOKEN_EXPIRED = 60 * 60 * 24 * 7; // second
const TIME_REFRESH_TOKEN_EXPIRED = 60 * 60 * 24 * 365; // second

const TIME_COOKIE_OF_ACCESS_TOKEN_EXPIRED = dayjs().add(7, "days").toDate();
const TIME_COOKIE_OF_REFRESH_TOKEN_EXPIRED = dayjs().add(365, "days").toDate();

export const setAccessAndRefreshTokenInCookie = async (res, user) => {
    await setAccessTokenInCookie(res, user);
    await setRefreshTokenInCookie(res, user);
};

export const setAccessTokenInCookie = async (res, user) => {
    let token = await generateAccessToken(user);
    let options = {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        expires: TIME_COOKIE_OF_ACCESS_TOKEN_EXPIRED,
    };
    res.cookie("token", token, options);
};

export const generateAccessToken = async (user) => {
    let token = await sign(user, SECRET, {
        expiresIn: TIME_ACCESS_TOKEN_EXPIRED,
    });
    return `Bearer ${token}`;
};

export const setRefreshTokenInCookie = async (res, user) => {
    let refreshToken = await generateRefreshToken(user);
    let options = {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        expires: TIME_COOKIE_OF_REFRESH_TOKEN_EXPIRED,
    };
    res.cookie("refreshToken", refreshToken, options);
};

export const generateRefreshToken = async (user) => {
    let refreshToken = await sign(user, SECRET_REFRESH, {
        expiresIn: TIME_REFRESH_TOKEN_EXPIRED,
    });

    return `Bearer ${refreshToken}`;
};

export const clearAccessAndRefreshTokenInCookie = (res) => {
    clearAccessTokenInCookie(res);
    clearRefreshTokenInCookie(res);
};

export const clearAccessTokenInCookie = (res) => {
    res.clearCookie("token");
};

export const clearRefreshTokenInCookie = (res) => {
    res.clearCookie("refreshToken");
};

/**
 * Show the user info to client. This function hide some 
 * sensitive info of user like password, ...
 * @example
 * ```Javascript
 * const userInfo = serializerUser(user.toObject());
 * ``` 
 * 
 * @param {object} - user.toObject().
 * @returns {object}
 */
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
