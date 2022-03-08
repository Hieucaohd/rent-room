import { getAllHomes, createHome } from "../../services";

export default {
    Query: {
        allHomes: async () => {
            return await getAllHomes();
        },
    },

    Mutation: {
        createNewHome: async (_, { newHome }) => {
            return await createHome(newHome);
        },
    },
};
