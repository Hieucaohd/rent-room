import { verify, JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { SECRET, SECRET_REFRESH } from "../config";
import { findUserByEmail, findUserByEmailAndID } from "../services";
import {
    InvalidTokenError,
    ParseTokenError,
    NoCookieInReqError,
    NoTokenInCookieError,
    EmailNotRegisterError,
    RefreshTokenExpired,
} from "../errors";
import { serializerUser } from "../helpers";
import { setAccessTokenInCookie } from "../helpers";

export class AuthMiddleware {
    async auth(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;

        try {
            let { token, refreshToken } =
                this.getAccessAndRefreshTokenFromRequest();

            let user = await this.getUserFromAccessAndRefreshToken(
                token,
                refreshToken
            );

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
                return this.next();
            }

            throw error;
        }
    }

    getAccessAndRefreshTokenFromRequest() {
        if (!this.req.cookies) {
            throw new NoCookieInReqError();
        }

        let { token, refreshToken } = this.req.cookies;

        if (!token || !refreshToken) {
            throw new NoTokenInCookieError();
        }

        token = this.parseToken(token);
        refreshToken = this.parseToken(refreshToken);

        return {
            token,
            refreshToken,
        };
    }

    parseToken(token) {
        let [prefix, authToken] = token.split(" ");

        if (prefix !== "Bearer" || !authToken || authToken === " ") {
            throw new ParseTokenError();
        }

        return authToken;
    }

    async getUserFromAccessAndRefreshToken(token, refreshToken) {
        let user;
        try {
            user = await this.getUserFromAccessToken(token);
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                user = await this.getUserFromRefreshTokenAndSetNewAccessToken(
                    refreshToken
                );
            }

            throw error;
        }

        return user;
    }

    async getUserFromAccessToken(token) {
        try {
            return await this.getUserFromDecodedToken(token, SECRET);
        } catch (error) {
            if (
                !(error instanceof TokenExpiredError) &&
                error instanceof JsonWebTokenError
            ) {
                // because TokenExpiredError is subclass of JsonWebTokenError
                // this prevent TokenExpiredError is catched in this function
                throw new InvalidTokenError();
            }

            throw error;
        }
    }

    async getUserFromRefreshTokenAndSetNewAccessToken(refreshToken) {
        try {
            let user = await this.getUserFromDecodedToken(
                refreshToken,
                SECRET_REFRESH
            );

            // set new access token
            await setAccessTokenInCookie(
                this.res,
                serializerUser(user.toObject())
            );

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

    async getUserFromDecodedToken(token, secret) {
        let decodedToken = verify(token, secret);

        // this is for secure but it prevent performance.
        let user = await findUserByEmailAndID(
            decodedToken.email,
            decodedToken._id
        );

        if (!user) {
            throw new EmailNotRegisterError();
        }

        return user;
    }
}
