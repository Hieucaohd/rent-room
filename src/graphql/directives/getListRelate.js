import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import * as AppModels from "../../models";
import { createOptions } from "../../helpers";

export const convertToQuery = (fieldName, objectID) => {
    let queryString = `{"${fieldName}": "null"}`;
    let query = JSON.parse(queryString);
    query[fieldName] = objectID;
    return query;
};

export const getCollection = (collectionName) => {
    for (const modelName in AppModels) {
        if (AppModels[modelName].collection.name === collectionName) {
            return AppModels[modelName];
        }
    }

    throw new Error("collection is not defined");
};

export const getListRelateDirectiveTransformer = (schema, directiveName) => {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            let getListRelateDirective = getDirective(
                schema,
                fieldConfig,
                directiveName
            );

            if (getListRelateDirective) {
                getListRelateDirective = getListRelateDirective[0];

                if (getListRelateDirective) {
                    fieldConfig.resolve = async function (
                        source,
                        args,
                        context,
                        info
                    ) {
                        let fieldName = getListRelateDirective["field"];
                        let query = convertToQuery(fieldName, source._id);
                        let collectionName =
                            getListRelateDirective["collection"];
                        let model = getCollection(collectionName);

                        let options = createOptions(args.page, args.limit);

                        return await model.paginate(query, options);
                    };

                    return fieldConfig;
                }
            }
        },
    });
};
