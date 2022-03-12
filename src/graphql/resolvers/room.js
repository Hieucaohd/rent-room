import mongoose from "mongoose";
import {
    createRoom,
    getAllRooms,
    updateExistRoom,
    deleteExistRoom,
} from "../../services";

export default {
    Mutation: {
        createNewRoom: async (_, { newRoom, homeId }) => {
            newRoom.home = homeId;
            return await createRoom(newRoom);
        },

        updateRoom: async (_, { updatedRoom, id }) => {
            return await updateExistRoom(updatedRoom, id);
        },

        deleteRoom: async (_, { id }) => {
            return await deleteExistRoom(id);
        },
    },

    Query: {
        allRooms: async (_, { page, limit }) => {
            return await getAllRooms(page, limit);
        },
    },
};
