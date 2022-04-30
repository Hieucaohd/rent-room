import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import {
    InvalidTokenError,
    ParseTokenError,
    NoCookieInReqError,
    NoTokenInCookieError,
    EmailNotRegisterError,
    RefreshTokenExpired,
} from '../common/errors/auth-error';
import { Request, Response, NextFunction } from 'express';
import '../common/types/typedef';
import { JSONWebTokenService, RequestService, ResponseService } from '../services/helpers/auth.service';
import { PublicUser } from '../common/public-user';

export class AuthMiddleware {
    /**
     * @description
     * Auth middlewares function try to get access token and refresh token
     * from cookie then extract user from these cookie,
     * if successfully then asign user and isAuth = true to req object.
     *
     * If there any error then asign {@link PublicUser} and isAuth = false to req object.
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    async auth(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;

        try {
            const requestService = new RequestService(req);

            let accessToken = requestService.getAccessTokenFromCookie();
            let refreshToken = requestService.getRefreshTokenFromCookie();

            let user = await this.getUserFromAccessAndRefreshToken(accessToken, refreshToken);

            this.req.isAuth = true;
            this.req.user = user;
            return this.next();
        } catch (error) {
            if (
                error instanceof InvalidTokenError ||
                error instanceof ParseTokenError ||
                error instanceof NoCookieInReqError ||
                error instanceof NoTokenInCookieError ||
                error instanceof EmailNotRegisterError ||
                error instanceof RefreshTokenExpired
            ) {
                this.req.isAuth = false;
                this.req.user = new PublicUser();
                return this.next();
            }

            throw error;
        }
    }

    /**
     * @description
     * First, try to get user from access token, if the access token
     * expired then try to get user from refresh token.
     *
     * @param {String} accessToken the token without prefix 'Bearer'.
     * @param {String} refreshToken the token without prefix 'Bearer'.
     * @returns {Promise<UserModel>}
     * @throws {Error}
     */
    async getUserFromAccessAndRefreshToken(accessToken, refreshToken) {
        let user;
        try {
            user = await JSONWebTokenService.getUserFromAccessToken(accessToken);
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                user = await this.getUserFromRefreshTokenAndSetNewAccessToken(refreshToken);
            }

            throw error;
        }

        return user;
    }

    /**
     * @description
     * Get user from refresh token.
     *
     * @throws {RefreshTokenExpired} if refresh token expired.
     * @throws {InvalidTokenError} if token is invalid.
     * @param {String} refreshToken
     * @returns {Promise<UserModel>}
     */
    async getUserFromRefreshTokenAndSetNewAccessToken(refreshToken) {
        try {
            let user = await JSONWebTokenService.getUserFromRefreshToken(refreshToken);

            // set new access token
            new ResponseService(this.res).setAccessTokenInCookie(user);

            return user;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new RefreshTokenExpired();
            } else if (error instanceof JsonWebTokenError) {
                throw new InvalidTokenError();
            }

            throw error;
        }
    }
}
