import { ApolloError } from "apollo-server-express";
import { issueToken, serializerUser } from "../../helpers";
import { createNewUser, loginByEmailAndPassword } from "../../services";

export default {
    Mutation: {
        register: async (_, { newUser }) => {
            try {
                let user = await createNewUser(newUser);
                user = serializerUser(user.toObject());
                let token = issueToken(user);

                return {
                    token,
                    user,
                };
            } catch (error) {
                throw new ApolloError(error.message);
            }
        },
    },

    Query: {
        login: async (_, { email, password }) => {
            try {
                let user = await loginByEmailAndPassword(email, password);
                user = serializerUser(user.toObject());
                let token = issueToken(user);

                return {
                    token,
                    user,
                };
            } catch (error) {
                throw new ApolloError(error.message);
            }
        },
    },
};
