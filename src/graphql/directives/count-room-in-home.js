import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { ApolloError } from "apollo-server-express";
import { defaultFieldResolver } from "graphql";
import { Room } from "../../models";

// Directive that require authentication before make resolve
export const countRoomDirectiveTransformer = (schema, directiveName) => {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            let countRoomDirective = getDirective(
                schema,
                fieldConfig,
                directiveName
            );

            if (countRoomDirective) {
                countRoomDirective = countRoomDirective[0];

                if (countRoomDirective) {
                    const { resolve = defaultFieldResolver } = fieldConfig;

                    fieldConfig.resolve = async function (
                        source,
                        args,
                        context,
                        info
                    ) {
                        const roomNumber = await Room.count({
                            home: source._id,
                        });
                        if (roomNumber === 0) {
                            return await resolve(source, args, context, info);
                        }
                        return roomNumber;
                    };

                    return fieldConfig;
                }
            }
        },
    });
};
