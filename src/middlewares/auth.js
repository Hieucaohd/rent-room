import { verify } from "jsonwebtoken";
import { SECRET } from "../config";
import { findUserByEmail } from "../services";

/* Parse authenticate token and return user to req */
export const authMiddleware = async (req, res, next) => {
    /* If user is successfully auth then req.user = user and req.isAuth = true 
    otherwise req.isAuth = false and return next()
    */

    // take Authorization variable from header
    let authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    // Authorization variable: Bearer {token}
    let token = authHeader.split(" ")[1];

    if (!token || token === " ") {
        req.isAuth = false;
        return next();
    }

    // get info after decoded token
    let decodedToken;

    try {
        decodedToken = verify(token, SECRET);
    } catch (error) {
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    let authUser = await findUserByEmail(decodedToken.email);
    if (!authUser) {
        req.isAuth = false;
        return next();
    }

    req.user = authUser;
    req.isAuth = true;
    return next();
};
