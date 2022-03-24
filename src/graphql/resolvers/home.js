import {
    getAllHomesFromDatabase,
    createHomeInDatabase,
    updateHomeInDatabase,
    deleteHomeInDatabase,
} from "../../services";

export default {
    Query: {
        allHomes: async (_, { page, limit }) => {
            return await getAllHomesFromDatabase(page, limit);
        },
    },

    Mutation: {
        createNewHome: async (_, { newHome }, { user }) => {
            newHome.owner = user._id;
            return await createHomeInDatabase(newHome);
        },

        updateHome: async (_, { updatedHome, id }) => {
            return await updateHomeInDatabase(updatedHome, id);
        },

        deleteHome: async (_, { id }) => {
            return await deleteHomeInDatabase(id);
        },
    },
};
