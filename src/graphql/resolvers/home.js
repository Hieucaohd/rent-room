import { getAllHomes, createHome } from "../../services";

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
    },
};
