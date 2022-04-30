export class RequestContext {
    constructor(user, isAuth, req, res) {
        this.user = user;
        this.req = req;
        this.res = res;
        this.isAuth = isAuth;
    }
}
