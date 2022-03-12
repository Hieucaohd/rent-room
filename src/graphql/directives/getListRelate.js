import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { createOptions } from "../../helpers";
import { convertToQuery, getModel } from "../../helpers";

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
                        let model = getModel(collectionName);

                        let options = createOptions(args.page, args.limit);

                        return await model.paginate(query, options);
                    };

                    return fieldConfig;
                }
            }
        },
    });
};
