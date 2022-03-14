import { verify, JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { SECRET, SECRET_REFRESH } from "../config";
import { findUserByEmail } from "../services";
import {
    UnknownUserError,
    ParseTokenError,
    NoCookieInReqError,
    NoTokenInCookieError,
    EmailNotRegisterError,
    LoginAgainError,
} from "../errors";
import { serializerUser } from "../helpers";
import { setAccessTokenInCookie } from "../helpers";

export class AuthMiddleware {
    constructor() {}

    parseToken(token) {
        let [prefix, authToken] = token.split(" ");

        if (prefix !== "Bearer" || !authToken || authToken === " ") {
            throw new ParseTokenError();
        }

        return authToken;
    }

    getTokens() {
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

    async decodedTokenToGetUser(token, secret) {
        let decodedToken = verify(token, secret);
        let user = await findUserByEmail(decodedToken.email);

        if (!user) {
            throw new EmailNotRegisterError();
        }

        return user;
    }

    async getUserFromRefreshToken(refreshToken) {
        try {
            let user = await this.decodedTokenToGetUser(
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
                throw new LoginAgainError("You must login again");
            } else if (error instanceof JsonWebTokenError) {
                throw new UnknownUserError();
            }

            throw error;
        }
    }

    async getUserFromAccessToken(token) {
        try {
            return await this.decodedTokenToGetUser(token, SECRET);
        } catch (error) {
            if (!(error instanceof TokenExpiredError) && error instanceof JsonWebTokenError) {
                // because TokenExpiredError is subclass of JsonWebTokenError
                // this prevent TokenExpiredError is catched in this function
                throw new UnknownUserError();
            }

            throw error;
        }
    }

    async getUserFromTokens(token, refreshToken) {
        try {
            return await this.getUserFromAccessToken(token);
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return await this.getUserFromRefreshToken(refreshToken);
            }

            throw error;
        }
    }

    async auth(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;

        try {
            let { token, refreshToken } = this.getTokens();
            let user = await this.getUserFromTokens(token, refreshToken);
            this.req.isAuth = true;
            this.req.user = user;
            return this.next();
        } catch (error) {
            if (
                error instanceof UnknownUserError ||
                error instanceof ParseTokenError ||
                error instanceof NoCookieInReqError ||
                error instanceof NoTokenInCookieError ||
                error instanceof EmailNotRegisterError
            ) {
                this.req.isAuth = false;
                return this.next();
            }
            
            throw error;
        }
    }
}
