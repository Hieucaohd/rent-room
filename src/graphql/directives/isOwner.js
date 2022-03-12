import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";
import { hasObjectPermission } from "../../permissions";

export const isOwnerDirectiveTransformer = (schema, directiveName) => {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            let isOwnerDirective = getDirective(
                schema,
                fieldConfig,
                directiveName
            );

            if (isOwnerDirective) {
                isOwnerDirective = isOwnerDirective[0];

                if (isOwnerDirective) {
                    let { resolve = defaultFieldResolver } = fieldConfig;
                    let { collectionName } = isOwnerDirective;

                    fieldConfig.resolve = async function (
                        source,
                        args,
                        context,
                        info
                    ) {
                        if (!context.isAuth) {
                            throw new Error("You must login first!");
                        }

                        if (
                            !hasObjectPermission(
                                collectionName,
                                args.id,
                                context.user
                            )
                        ) {
                            throw new Error(
                                "You are not owner. Permission denied!"
                            );
                        }

                        return await resolve(source, args, context, info);
                    };

                    return fieldConfig;
                }
            }
        },
    });
};
