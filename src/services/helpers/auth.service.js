import { sign, verify } from 'jsonwebtoken';
import { pick } from 'lodash';
import {
    ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY,
    ACCESS_TOKEN_COOKIE_KEY,
    REFRESH_TOKEN_COOKIE_KEY,
    TIME_ACCESS_TOKEN_EXPIRED,
    TIME_REFRESH_TOKEN_EXPIRED,
    TIME_COOKIE_OF_ACCESS_TOKEN_EXPIRED,
    TIME_COOKIE_OF_REFRESH_TOKEN_EXPIRED,
} from '../../config';
import { Request, Response } from 'express';
import '../../common/types/typedef';
import { findUserByEmailAndID } from '../model-services/user.service';
import {
    EmailNotRegisterError,
    NoCookieInReqError,
    NoTokenInCookieError,
} from '../../common/errors/auth-error';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

/**
 * Use to asign new access token and refresh token to cookie,
 * serializer user to return to client.
 *
 * @param {UserModel | UserResult} user
 * @param {Response} res
 */
export function authenticateUser(user, res) {
    const responseService = new ResponseService(res);
    responseService.setAccessTokenInCookie(user);
    responseService.setRefreshTokenInCookie(user);
}

/**
 * @description
 * Show the user info to client. This function hide some
 * sensitive info of user like password, ...
 *
 * @example
 * ```Javascript
 * const userSerializer = serializerUser(userModel);
 * ```
 *
 * @param {UserModel} user
 * @returns {UserResult}
 */
export function serializerUser(user) {
    try {
        return pick(user.toObject(), [
            '_id',
            'email',
            'fullname',
            'numberPhone',
            'province',
            'district',
            'ward',
            'avatar',
            'createdAt',
            'updatedAt',
            'userType'
        ]);
    } catch (err) {
        return user;
    }
}

/**
 * @description
 * This class is a wrap of Express's Request object.
 * Manipulate with cookie, ...
 */
export class RequestService {
    /**
     * @constructor
     * @param {Request} req
     */
    constructor(req) {
        this.req = req;
    }

    /**
     * @description
     * Get the refresh token from cookie.
     *
     * @returns {String}
     */
    getRefreshTokenFromCookie() {
        const refreshToken = this.getTokenFromCookie(REFRESH_TOKEN_COOKIE_KEY);
        return refreshToken;
    }

    /**
     * @description
     * Get the access token from cookie.
     *
     * @returns {String}
     */
    getAccessTokenFromCookie() {
        const accessToken = this.getTokenFromCookie(ACCESS_TOKEN_COOKIE_KEY);
        return accessToken;
    }

    /**
     * @param {String} cookieKey the key of the token in cookie.
     * @param {Boolean} getRawToken if true get the token without prefix 'Bearer'.
     * @returns {String}
     *
     * @throws {NoCookieInReqError} if the req has not cookie.
     * @throws {NoTokenInCookieError} if don't exist the token with the key {@link cookieKey} in cookie.
     */
    getTokenFromCookie(cookieKey, getRawToken = true) {
        if (!this.req.cookies) {
            throw new NoCookieInReqError();
        }

        let token = this.req.cookies[cookieKey];

        if (!token) {
            throw new NoTokenInCookieError();
        }

        if (getRawToken) {
            token = JSONWebTokenService.parseToken(token);
        }

        return token;
    }
}

/**
 * @description
 * This class is a wrap of Express's Response object.
 * Manipulate with cookie, ...
 */
export class ResponseService {
    /**
     * @constructor
     * @param {Response} res
     */
    constructor(res) {
        this.res = res;
    }

    /**
     * @description
     * Generate new access token and asign it to Cookie.
     *
     * @param {UserModel} user
     */
    setAccessTokenInCookie(user) {
        let accessToken = JSONWebTokenService.generateTokenForUser(
            user,
            ACCESS_TOKEN_SECRET_KEY,
            TIME_ACCESS_TOKEN_EXPIRED
        );
        this.setTokenInCookie(
            ACCESS_TOKEN_COOKIE_KEY,
            accessToken,
            TIME_COOKIE_OF_ACCESS_TOKEN_EXPIRED
        );
    }

    /**
     * @description
     * Generate new refresh token and asign it to cookie.
     *
     * @param {UserModel} user
     */
    setRefreshTokenInCookie(user) {
        let refreshToken = JSONWebTokenService.generateTokenForUser(
            user,
            REFRESH_TOKEN_SECRET_KEY,
            TIME_REFRESH_TOKEN_EXPIRED
        );
        this.setTokenInCookie(
            REFRESH_TOKEN_COOKIE_KEY,
            refreshToken,
            TIME_COOKIE_OF_REFRESH_TOKEN_EXPIRED
        );
    }

    /**
     * @param {String} cookieKey the key of cookie.
     * @param {String} token the token with prefix 'Bearer'.
     * @param {Date} timeCookieExpired time that the cookie expired.
     *
     * @throws {Error} if no res pass to constructor.
     */
    setTokenInCookie(cookieKey, token, timeCookieExpired) {
        let options = {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            expires: timeCookieExpired,
        };

        this.res.cookie(cookieKey, token, options);
    }

    clearAccessTokenInCookie() {
        this.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
    }

    clearRefreshTokenInCookie() {
        this.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
    }

    /**
     * @description
     * Clear cookie by key.
     *
     * @param {String} key the key of cookie
     */
    clearCookie(key) {
        this.res.clearCookie(key);
    }
}

/**
 * @description
 * This class work with access and refresh token.
 */
export class JSONWebTokenService {
    /**
     * @description
     * Generate token base on secret.
     *
     * @param {UserModel} user
     * @param {String} secretKey secret key to generate token.
     * @param {Date} timeExpired time that token expired.
     * @returns {String} the token with prefix 'Bearer'.
     */
    static generateTokenForUser(user, secretKey, timeExpired) {
        let token = sign(serializerUser(user), secretKey, {
            expiresIn: timeExpired,
        });
        return `Bearer ${token}`;
    }

    /**
     * @description
     * Get the raw token from token created by {@link generateTokenForUser}.
     *
     * @param {String} token - the token with prefix 'Bearer'.
     * @returns {String} the raw token without prefix.
     *
     * @throws {ParseTokenError} if there is no prefix on token or prefix invalid.
     */
    static parseToken(token) {
        let [prefix, authToken] = token.split(' ');

        if (prefix !== 'Bearer' || !authToken || authToken === ' ') {
            throw new ParseTokenError();
        }

        return authToken;
    }

    /**
     * @description
     * Decode the refresh token and get the user.
     *
     * @param {String} refreshToken refresh token without prefix 'Bearer'.
     * @returns {Promise<UserModel>}
     *
     * @throws {EmailNotRegisterError} if not found user from token.
     * @throws {TokenExpiredError} when token expired.
     * @throws {JsonWebTokenError} when token is invalid.
     */
    static async getUserFromRefreshToken(refreshToken) {
        return await JSONWebTokenService.getUserFromToken(refreshToken, REFRESH_TOKEN_SECRET_KEY);
    }

    /**
     * @description
     * Decode the access token and get the user.
     *
     * @param {String} accessToken the access token without prefix 'Bearer'.
     * @returns {Promise<UserModel>}
     *
     * @throws {EmailNotRegisterError} if not found user from token.
     * @throws {TokenExpiredError} when token expired.
     * @throws {JsonWebTokenError} when token is invalid.
     */
    static async getUserFromAccessToken(accessToken) {
        return await JSONWebTokenService.getUserFromToken(accessToken, ACCESS_TOKEN_SECRET_KEY);
    }

    /**
     * @description
     * When decode token, we get the {@link UserResult}.
     * Use the email and _id from {@link UserResult} to find {@link UserModel}
     * from database.
     *
     * @param {String} token the access token or refresh token without prefix 'Bearer'.
     * @param {String} secretKey the secret key of access token or refresh token.
     * @returns {Promise<UserModel>}
     *
     * @throws {EmailNotRegisterError} if not found user from token.
     * @throws {TokenExpiredError} when token expired.
     * @throws {JsonWebTokenError} when token is invalid.
     */
    static async getUserFromToken(token, secretKey) {
        /** @type {UserResult} */
        let userSerializer = verify(token, secretKey);

        let user = await findUserByEmailAndID(userSerializer.email, userSerializer._id);

        if (!user) {
            throw new EmailNotRegisterError();
        }

        return user;
    }
}
