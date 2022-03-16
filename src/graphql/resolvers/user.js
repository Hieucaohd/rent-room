import { ApolloError } from "apollo-server-express";
import {
    clearTokensInCookie,
    serializerUser,
    setAccessTokenInCookie,
    setRefreshTokenInCookie,
} from "../../helpers";
import { createNewUser, loginByEmailAndPassword } from "../../services";

const setTokensInCookie = async (res, user) => {
    await setAccessTokenInCookie(res, user);
    await setRefreshTokenInCookie(res, user);
};

export default {
    Mutation: {
        register: async (_, { newUser }, { res }) => {
            try {
                let user = await createNewUser(newUser);
                user = serializerUser(user.toObject());
                await setTokensInCookie(res, user);

                return {
                    user,
                };
            } catch (error) {
                throw new ApolloError(error.message);
            }
        },

        logout: async (_, args, {res, isAuth}) => {
            let status = isAuth;
            clearTokensInCookie(res);
            return {
                status
            }; 
        },
    },

    Query: {
        login: async (_, { email, password }, { res }) => {
            try {
                let user = await loginByEmailAndPassword(email, password);
                user = serializerUser(user.toObject());
                await setTokensInCookie(res, user);

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
