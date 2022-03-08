import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";

let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

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
