import { createRoom, getAllRooms } from "../../services";

export default {
    Mutation: {
        createNewRoom: async (_, { newRoom, home_id }, { user }) => {
            return await createRoom(newRoom, home_id);
        },
    },

    Query: {
        allRooms: async (_, { page, limit }) => {
            return await getAllRooms(page, limit);
        },
    },
};
