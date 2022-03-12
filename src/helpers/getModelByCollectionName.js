import * as AppModels from "../models";

export const getModel = (collectionName) => {
    for (const modelName in AppModels) {
        if (AppModels[modelName].collection.name === collectionName) {
            return AppModels[modelName];
        }
    }

    throw new Error("collection is not defined");
};
