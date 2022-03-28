import { async } from "@firebase/util";
import { compare, hash } from "bcryptjs";
import { User } from "../models";

export const createUserInDatabase = async (newUser) => {
    let user = new User(newUser);
    user.password = await hash(user.password, 10);

    return await user.save();
};

export const updateUserInDatabase = async (updateInfo, user) => {
    const userUpdated = await User.findOneAndUpdate(
        {
            _id: user._id,
        },
        {
            ...updateInfo,
        },
        {
            returnDocument: "after",
        }
    );

    if (!userUpdated) {
        throw new Error("User item does not exist!");
    }

    return userUpdated;
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

export const findUserByEmailAndID = async (email, id) => {
    return await User.findOne({ _id: id, email: email });
};
