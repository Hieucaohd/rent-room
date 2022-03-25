import { ApolloError } from "apollo-server-express";
import {
    clearAccessAndRefreshTokenInCookie,
    serializerUser,
    setAccessAndRefreshTokenInCookie,
} from "../../helpers";
import {
    createUserInDatabase,
    loginByEmailAndPassword,
    updateUserInDatabase,
} from "../../services";

export default {
    Mutation: {
        register: async (_, { newUser }, { res }) => {
            try {
                let user = await createUserInDatabase(newUser);
                user = serializerUser(user.toObject());
                await setAccessAndRefreshTokenInCookie(res, user);

                return {
                    user,
                };
            } catch (error) {
                throw new ApolloError(error.message);
            }
        },

        logout: async (_, args, { res, isAuth }) => {
            let status = isAuth;
            clearAccessAndRefreshTokenInCookie(res);
            return {
                status,
            };
        },

        updateUser: async (_, args, { updateInfo }, { user }) => {
            let user = await updateUserInDatabase(updateInfo, user);
            user = serializerUser(user.toObject());

            return user;
        },
    },

    Query: {
        login: async (_, { email, password }, { res }) => {
            try {
                let user = await loginByEmailAndPassword(email, password);
                user = serializerUser(user.toObject());
                await setAccessAndRefreshTokenInCookie(res, user);

                return {
                    user,
                };
            } catch (error) {
                throw new ApolloError(error.message);
            }
        },

        profile: async (_, args, { user, isAuth }) => {
            return {
                user,
                isAuth,
            };
        },
    },
};
