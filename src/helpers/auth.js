import { sign } from "jsonwebtoken";
import { pick } from "lodash";
import { SECRET } from "../config";

export const issueToken = async (user) => {
    let token = await sign(user, SECRET, {
        expiresIn: 60 * 60 * 24,
    });
    return `Bearer ${token}`;
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
