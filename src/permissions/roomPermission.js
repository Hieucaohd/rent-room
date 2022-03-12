import { Home, Room } from "../models";

export const hasObjPermission = async (roomId, user) => {
    let room = Room.findById(roomId);

    if (!room) {
        throw new Error("Room does not exist!");
    }

    let home = Home.findOne({ _id: room.home, owner: user._id });

    if (!home) {
        return false;
    }

    return true;
};
