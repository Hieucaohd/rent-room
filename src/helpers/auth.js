import { sign } from "jsonwebtoken";
import { pick } from "lodash";
import { SECRET, SECRET_REFRESH } from "../config";
import dayjs from "dayjs";

export const issueToken = async (user) => {
    let token = await sign(user, SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    return `Bearer ${token}`;
};

export const issueRefreshToken = async (user) => {
    let refreshToken = await sign(user, SECRET_REFRESH, {
        expiresIn: 60 * 60 * 24 * 7,
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
    let token = await issueToken(user);
    let options = {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        expires: dayjs().add(4, "days").toDate(),
    };
    res.cookie("token", token, options);
};

export const clearAccessTokenInCookie = (res) => {
    res.clearCookie("token");
}

export const clearRefreshTokenInCookie = (res) => {
    res.clearCookie("refreshToken");
}

export const clearTokensInCookie = (res) => {
    clearAccessTokenInCookie(res);
    clearRefreshTokenInCookie(res);
}


export const setRefreshTokenInCookie = async (res, user) => {
    let refreshToken = await issueRefreshToken(user);
    let options = {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        expires: dayjs().add(7, "days").toDate(),
    };
    res.cookie("refreshToken", refreshToken, options);
};
