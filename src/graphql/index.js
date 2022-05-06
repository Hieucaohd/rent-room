import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { authRequireDirectiveTransformer, isOwnerDirectiveTransformer } from './directives';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import { RequestContext } from './common/request-context';

import { generateErrorCodeEnum } from './generate-types/generate-error-code-enum';

let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

schema = generateErrorCodeEnum(schema);

schema = isOwnerDirectiveTransformer(schema, 'isOwner');
schema = authRequireDirectiveTransformer(schema, 'authRequire');

const server = new ApolloServer({
    schema,
    context: ({ req, res }) => {
        let { user, isAuth } = req;

        return new RequestContext(user, isAuth, req, res);
    },
});

export default server;
