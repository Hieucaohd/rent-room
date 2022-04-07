import { Room } from "../models";
import { createOptions } from "../helpers";

export const createRoomInDatabase = async (newRoom) => {
    const room = await Room.create(newRoom);

    return await Room.findById(room._id);
};

export const updateRoomInDatabase = async (updateInfo, roomID) => {
    const updatedRoom = await Room.findOneAndUpdate(
        {
            _id: roomID,
        },
        { ...updateInfo },
        {
            returnDocument: "after",
        }
    );
    return updatedRoom;
};

export const deleteRoomInDatabase = async (roomID) => {
    const deletedRoom = await Room.findByIdAndDelete(roomID);
    return deletedRoom._id;
};

export const getAllRoomsFromDatabase = async (page, limit) => {
    let options = createOptions(page, limit);
    options.sort = {
        createdAt: 1,
    };

    return await Room.paginate({}, options);
};

export const getRoomByIdFromDatabase = async (roomId) => {
    return await Room.findById(roomId);
}
