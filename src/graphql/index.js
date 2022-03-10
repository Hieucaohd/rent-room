import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import {
    authRequireDirectiveTransformer,
    getListRelateDirectiveTransformer,
} from "./directives";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";

let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

schema = authRequireDirectiveTransformer(schema, "authRequire");
schema = getListRelateDirectiveTransformer(schema, "getListRelate");

const server = new ApolloServer({
    schema,
    context: ({ req }) => {
        let { user, isAuth } = req;

        return {
            req,
            user,
            isAuth,
        };
    },
});

export default server;
