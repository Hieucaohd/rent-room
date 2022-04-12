import { Home } from "../models";
import { createOptions } from "../helpers";

export const getAllHomesFromDatabase = async (page, limit) => {
    let options = createOptions(page, limit);
    options.sort = {
        createdAt: -1,
    };

    return await Home.paginate({}, options);
};

export const updateHomeInDatabase = async (updateInfo, homeID) => {
    const home = await Home.findOneAndUpdate(
        {
            _id: homeID,
        },
        { ...updateInfo },
        {
            returnDocument: "after",
        }
    );

    if (!home) {
        throw new Error("Home item does not exist!");
    }
    return home;
};

export const deleteHomeInDatabase = async (homeID) => {
    const home = await Home.findOneAndDelete({
        _id: homeID,
    });

    if (!home) {
        throw new Error("Home item does not exist!");
    }

    return home._id;
};

export const createHomeInDatabase = async (newHome) => {
    // we need to use findById after create and don't take the result of create
    // because findById function auto populate 'owner' field but create function does not.
    const home = await Home.create(newHome);
    return await Home.findById(home._id);
};

export const getHomeByIdFromDatabase = async (homeId) => {
    return await Home.findById(homeId);
}
