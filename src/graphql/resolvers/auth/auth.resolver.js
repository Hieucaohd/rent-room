import { Register } from './auth.mutation';
import { ResponseService, serializerUser } from '../../../services/helpers/auth.service';
import '../../../common/types/typedef';
import { Login } from './auth.query';

export default {
    Mutation: {
        register: Register.mutate.bind(Register),
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
        login: Login.query.bind(Login),
        profile: async (_, args, { user, isAuth }) => {
            user = serializerUser(user);
            return {
                user,
                isAuth,
            };
        },
    },
};
