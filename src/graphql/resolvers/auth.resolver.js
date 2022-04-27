import { ApolloError } from 'apollo-server-express';
import { ResponseService, serializerUser } from '../../helpers/auth.service';
import {
    createUserInDatabase,
    loginByEmailAndPassword,
} from '../../services/user.service';
import { Request, Response } from 'express';
import '../../common/typedef';

/**
 * Use to asign new access token and refresh token to cookie,
 * serializer user to return to client.
 *
 * @param {UserModel} user
 * @param {Request} req
 * @param {Response} res
 * @returns {UserResult}
 */
function authenticateUser(user, req, res) {
    const responseService = new ResponseService(res);
    responseService.setAccessTokenInCookie(user);
    responseService.setRefreshTokenInCookie(user);
    return serializerUser(user);
}

export default {
    Mutation: {
        register: async (_, { newUser }, { res, req }) => {
            try {
                let user = await createUserInDatabase(newUser);
                user = authenticateUser(user, req, res);

                return {
                    user,
                };
            } catch (error) {
                throw new ApolloError(error.message);
            }
        },

        logout: async (_, args, { res, isAuth }) => {
            let status = isAuth;
            const responseService = new ResponseService(res);
            responseService.clearAccessTokenInCookie();
            responseService.clearRefreshTokenInCookie();
            return {
                status,
            };
        },
    },

    Query: {
        login: async (_, { email, password }, { res, req }) => {
            try {
                let user = await loginByEmailAndPassword(email, password);
                user = authenticateUser(user, req, res);

                return {
                    user,
                };
            } catch (error) {
                throw new ApolloError(error.message);
            }
        },

        profile: async (_, args, { user, isAuth }) => {
            user = serializerUser(user);
            return {
                user,
                isAuth,
            };
        },
    },
};
