import { compare, hash } from 'bcryptjs';
import { User } from '../../models';
import '../../common/types/typedef';
import { ObjectId } from 'mongodb';
import { BaseService } from './base.service';
import { EmailIncorrectError, PasswordIncorrectError } from '../../common/errors/graphql-errors';


/**
 * @param {UserUpdateInput} updateInfo
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

export class UserService extends BaseService {
    /** @type {import('../../common/types/common-types').MetaBaseService} */
    static meta = {
        model: User
    }

    /**
     * @param {UserInput} newUser
     * @returns {Promise<UserModel>}
     */
    static async createUser(newUser, context, session) {
        newUser.password = await hash(newUser.password, 10);
        let user = await User.create([{ ...newUser }], { session });
        user = user[0];
        return await User.findById(user._id).session(session);
    }

    /**
     * @param {String} email
     * @param {String} password
     * @returns {Promise<UserModel>}
     * @throws {Error}
     */
    static async getUserByEmailAndPassword(email, password, context) {
        let user = await findUserByEmail(email);
        if (!user) {
            throw new EmailIncorrectError();
        }

        let isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new PasswordIncorrectError();
        }

        return user;
    }

    /**
     * @param {String} email
     * @returns {Promise<UserModel>}
     */
    static async findUserByEmail(email, context) {
        const user = await User.findOne({ email });
        return user;
    }

    /**
     * @param {String} email
     * @param {String | ObjectId} id
     * @returns {Promise<UserModel>}
     */
    static async findUserByEmailAndID(email, id, context) {
        const user = await User.findOne({ _id: id, email: email });
        return user;
    }

    static async createInstance(data, context, session) {
        let user = await this.createUser(data, context, session);
        return user;
    }
}
