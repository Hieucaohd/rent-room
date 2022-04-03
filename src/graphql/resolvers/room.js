import mongoose from "mongoose";
import {
    createRoomInDatabase,
    getAllRoomsFromDatabase,
    updateRoomInDatabase,
    deleteRoomInDatabase,
    getRoomByIdFromDatabase
} from "../../services";

export default {
    Mutation: {
        createNewRoom: async (_, { newRoom, homeId }) => {
            newRoom.home = homeId;
            return await createRoomInDatabase(newRoom);
        },

        updateRoom: async (_, { updatedRoom, id }) => {
            return await updateRoomInDatabase(updatedRoom, id);
        },

        deleteRoom: async (_, { id }) => {
            return await deleteRoomInDatabase(id);
        },
    },

    Query: {
        allRooms: async (_, { page, limit }) => {
            return await getAllRoomsFromDatabase(page, limit);
        },

        getRoomById: async (_, {roomId}) => {
            return await getRoomByIdFromDatabase(roomId);
        }
    },
};
