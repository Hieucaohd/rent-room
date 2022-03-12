import { Home } from "../models";

export const hasObjPermission = async (homeId, user) => {
    let home = await Home.findOne({ _id: homeId, owner: user._id });

    if (!home) {
        return false;
    }

    return true;
};
