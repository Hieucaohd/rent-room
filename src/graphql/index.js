import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import {
    authRequireDirectiveTransformer,
    getListRelateDirectiveTransformer,
    isOwnerDirectiveTransformer,
} from "./directives";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";

let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

schema = isOwnerDirectiveTransformer(schema, "isOwner");
schema = authRequireDirectiveTransformer(schema, "authRequire");
schema = getListRelateDirectiveTransformer(schema, "getListRelate");

const server = new ApolloServer({
    schema,
    context: ({ req, res }) => {
        let { user, isAuth } = req;

        return {
            req,
            res,
            user,
            isAuth,
        };
    },
});

export default server;
