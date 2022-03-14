import { SECRET, SECRET_REFRESH } from "../../config";
import {
    EmailNotRegisterError,
    IsPublicUser,
    LoginAgainError,
    NoCookieInReqError,
    NoTokenInCookieError,
    ParseTokenError,
} from "../../errors";
import { issueRefreshToken, issueToken, serializerUser } from "../../helpers";
import { AuthMiddleware } from "../auth";
import { User } from "../../models";
import _ from "lodash";
import { async } from "@firebase/util";
import { sign } from "jsonwebtoken";

const mockingoose = require("mockingoose");

describe("test auth middleware", () => {
    let authMiddleware;
    let token;
    let refreshToken;
    let user;

    beforeAll(async () => {
        user = {
            _id: "6221f3f0ecc8d631b22d096f",
            email: "test10@gmail.com",
            fullname: "Hieu",
            role: [],
            userType: "TENANT",
            password:
                "$2a$10$YsjuPrA5GJMvF7FqmfnkZ.BZy3SgeUAIfH7w6MnUiisf5Wvl4jTQS",
        };
        mockingoose(User).toReturn(user, "findOne");

        user = await User.findOne({ email: "test10@gmail.com" });
    });

    beforeEach(async () => {
        authMiddleware = new AuthMiddleware();
        authMiddleware.req = {};
        authMiddleware.res = {};
        authMiddleware.next = () => {};

        token = await issueToken(serializerUser(user.toObject()));
        refreshToken = await issueRefreshToken(serializerUser(user.toObject()));
    });

    describe("test parseToken", () => {
        it("expect true result", () => {
            expect(authMiddleware.parseToken(token)).toBe(token.split(" ")[1]);
        });

        it("test throw parse token error", () => {
            let listFakeToken = [
                `FakePrefix + ${token.split(" ")[1]}`,
                `Bearer `,
                ` `,
                "Bearer  ",
                "",
            ];

            listFakeToken.forEach((fakeToken) => {
                expect(() => {
                    authMiddleware.parseToken(fakeToken);
                }).toThrow(ParseTokenError);
            });
        });
    });

    describe("test getTokens", () => {
        it("test throw error when no cookie in req", () => {
            expect(() => {
                authMiddleware.getTokens();
            }).toThrow(NoCookieInReqError);
        });

        it("test throw error when no tokens in cookies", () => {
            authMiddleware.req.cookies = {};
            expect(() => {
                authMiddleware.getTokens();
            }).toThrow(NoTokenInCookieError);
        });

        it("test true result when have tokens in cookies", () => {
            let tokenParsed = {
                token: authMiddleware.parseToken(token),
                refreshToken: authMiddleware.parseToken(refreshToken),
            };

            authMiddleware.req.cookies = { token, refreshToken };
            expect(authMiddleware.getTokens()).toEqual(tokenParsed);
        });
    });

    describe("test decodedTokenToGetUser", () => {
        // it("test throw error when not found user from email", () => {
        //     return expect(
        //         authMiddleware.decodedTokenToGetUser(token, SECRET)
        //     ).rejects.toThrow(EmailNotRegisterError);
        // });
        // it("test true result", async () => {
        //     token = authMiddleware.parseToken(token);
        //     let userResult = await authMiddleware.decodedTokenToGetUser(
        //         token,
        //         SECRET
        //     );
        //     console.log("userResult =", userResult, typeof userResult);
        //     console.log("user =", user, typeof user);
        //     console.log(_.isEqual(userResult, user));
        //     expect(userResult === user).toBe(true);
        // });
    });

    describe("test getUserFromRefreshToken", () => {
        beforeEach(() => {
            // fake function to set cookie
            authMiddleware.res.cookie = (a, b, c) => {
                // nothing here
            };
        });

        it("test throw error when refresh token expired", async () => {
            let refreshTokenExpired = await sign(
                serializerUser(user.toObject()),
                SECRET_REFRESH,
                {
                    expiresIn: 1,
                }
            );

            let delayInMilliseconds = 2000; //2 second

            setTimeout(function () {
                expect(
                    authMiddleware.getUserFromRefreshToken(refreshTokenExpired)
                ).rejects.toThrow(LoginAgainError);
            }, delayInMilliseconds);
        });

        it("test throw error when refresh token invalid", async () => {
            let refreshTokenInvalid = await sign(
                serializerUser(user.toObject()),
                SECRET_REFRESH,
                {
                    expiresIn: 1,
                }
            );
            refreshTokenInvalid += "1234124";
            expect(
                authMiddleware.getUserFromRefreshToken(refreshTokenInvalid)
            ).rejects.toThrow(IsPublicUser);
        });

        it("test get true user when refresh token not expired and not invalid", async () => {
            refreshToken = refreshToken.split(" ")[1];
            let userExpect = await authMiddleware.decodedTokenToGetUser(
                refreshToken,
                SECRET_REFRESH
            );
            let userResult = await authMiddleware.getUserFromRefreshToken(
                refreshToken
            );
        });
    });
});
