import { compare, hash } from 'bcryptjs';
import { User } from '../models';
import '../common/typedef';
import { ObjectId } from 'mongodb';

/**
 * @param {UserInput} newUser
 * @returns {Promise<UserModel>}
 */
export const createUserInDatabase = async (newUser) => {
    let user = new User(newUser);
    user.password = await hash(user.password, 10);

    return await user.save();
};

/**
 * @param {UserInput} updateInfo
 * @param {UserModel} user
 * @returns {Promise<UserModel>}
 * @throws {Error}
 */
export const updateUserInDatabase = async (updateInfo, user) => {
    const userUpdated = await User.findOneAndUpdate(
        {
            _id: user._id,
        },
        {
            ...updateInfo,
        },
        {
            returnDocument: 'after',
        }
    );

    if (!userUpdated) {
        throw new Error('User item does not exist!');
    }

    return userUpdated;
};

/**
 * @param {String} email
 * @param {String} password
 * @returns {Promise<UserModel>}
 * @throws {Error}
 */
export const loginByEmailAndPassword = async (email, password) => {
    let user = await findUserByEmail(email);
    if (!user) {
        throw new Error('This email is not registed');
    }

    let isMatch = await compare(password, user.password);

    if (!isMatch) {
        throw new Error('Password is incorrect');
    }

    return user;
};

/**
 * @param {String} email
 * @returns {Promise<UserModel>}
 */
export const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};

/**
 * @param {String} email
 * @param {String | ObjectId} id
 * @returns {Promise<UserModel>}
 */
export const findUserByEmailAndID = async (email, id) => {
    const user = await User.findOne({ _id: id, email: email });
    return user;
};
