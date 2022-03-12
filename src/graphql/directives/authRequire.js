import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { ApolloError } from "apollo-server-express";
import { defaultFieldResolver } from "graphql";

// Directive that require authentication before make resolve
export const authRequireDirectiveTransformer = (schema, directiveName) => {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            let authRequireDirective = getDirective(
                schema,
                fieldConfig,
                directiveName
            );

            if (authRequireDirective) {
                authRequireDirective = authRequireDirective[0];

                if (authRequireDirective) {
                    const { resolve = defaultFieldResolver } = fieldConfig;

                    fieldConfig.resolve = async function (
                        source,
                        args,
                        context,
                        info
                    ) {
                        if (!context.isAuth) {
                            throw new ApolloError("Authorization required!");
                        }
                        return await resolve(source, args, context, info);
                    };

                    return fieldConfig;
                }
            }
        },
    });
};
