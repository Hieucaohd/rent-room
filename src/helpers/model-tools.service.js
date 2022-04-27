import * as AppModels from "../models";

export const getModel = (collectionName) => {
    for (const modelName in AppModels) {
        if (AppModels[modelName].collection.name === collectionName) {
            return AppModels[modelName];
        }
    }

    throw new Error("collection is not defined");
};

export const convertToQuery = (fieldName, value) => {
    let queryString = `{"${fieldName}": "null"}`;
    let query = JSON.parse(queryString);
    query[fieldName] = value;
    return query;
};