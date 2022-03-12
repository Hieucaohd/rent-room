import { Room } from "../models";
import { createOptions } from "../helpers";

export const createRoom = async (newRoom) => {
    const room = await Room.create(newRoom);

    return await Room.findById(room._id);
};

export const updateExistRoom = async (updatedRoom, id) => {
    const room = await Room.findOneAndUpdate(
        {
            _id: id,
        },
        { ...updatedRoom },
        {
            returnDocument: "after",
        }
    );
    return room;
};

export const deleteExistRoom = async (id) => {
    const room = await Room.findByIdAndDelete(id);
    return room._id;
};

export const getAllRooms = async (page, limit) => {
    let options = createOptions(page, limit);
    options.sort = {
        createdAt: -1,
    };

    return await Room.paginate({}, options);
};
