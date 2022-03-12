import {
    getAllHomes,
    createHome,
    updateExistHome,
    deleteExistHome,
} from "../../services";

export default {
    Query: {
        allHomes: async (_, { page, limit }) => {
            return await getAllHomes(page, limit);
        },
    },

    Mutation: {
        createNewHome: async (_, { newHome }, { user }) => {
            newHome.owner = user._id;
            return await createHome(newHome);
        },

        updateHome: async (_, { updatedHome, id }) => {
            return await updateExistHome(updatedHome, id);
        },

        deleteHome: async (_, { id }) => {
            return await deleteExistHome(id);
        },
    },
};
