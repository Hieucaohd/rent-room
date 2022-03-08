import { compare, hash } from "bcryptjs";
import { User } from "../models";
import { uploadFile } from "../helpers";

export const createNewUser = async (newUser) => {
    let user = new User(newUser);
    user.password = await hash(user.password, 10);

    return await user.save();
};

export const loginByEmailAndPassword = async (email, password) => {
    let user = await findUserByEmail(email);
    if (!user) {
        throw new Error("This email is not registed");
    }

    let isMatch = await compare(password, user.password);

    if (!isMatch) {
        throw new Error("Password is incorrect");
    }

    return user;
};

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};
