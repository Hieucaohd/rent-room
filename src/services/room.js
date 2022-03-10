import mongoose from "mongoose";
import { Room } from "../models";
import { createOptions } from "../helpers";

export const createRoom = async (newRoom, home_id) => {
    home_id = mongoose.Types.ObjectId(home_id);
    const room = new Room({ ...newRoom, home: home_id });
    return await room.save();
};

export const getAllRooms = async (page, limit) => {
    let options = createOptions(page, limit);
    options.sort = {
        createdAt: -1,
    };

    return await Room.paginate({}, options);
};
