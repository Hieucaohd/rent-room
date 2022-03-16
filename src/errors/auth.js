export class UnknownUserError extends Error {
    constructor(message) {
        if (!message) {
            message = "This is public user";
        }

        super(message);
        this.name = "IsPublicUser";
    }
}

export class ParseTokenError extends Error {
    constructor(message) {
        if (!message) {
            message = "Parse auth token failed!";
        }

        super(message);
        this.name = "ParseTokenError";
    }
}

export class NoCookieInReqError extends Error {
    constructor(message) {
        if (!message) {
            message = "No cookie in request!";
        }

        super(message);
        this.name = "NoCookieInReqError";
    }
}

export class NoTokensInCookieError extends Error {
    constructor(message) {
        if (!message) {
            message = "No token in cookie!";
        }

        super(message);
        this.name = "NoTokenInCookie";
    }
}

export class EmailNotRegisterError extends Error {
    constructor(message) {
        super(message);
        this.name = "EmailNotRegisterError";
    }
}

export class RefreshTokenExpired extends Error {
    constructor(message) {
        super(message);
        this.name = "RefreshTokenExpired";
    }
}
