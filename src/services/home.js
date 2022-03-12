import { Home } from "../models";
import { createOptions } from "../helpers";

export const getAllHomes = async (page, limit) => {
    let options = createOptions(page, limit);
    options.sort = {
        createdAt: -1,
    };

    return await Home.paginate({}, options);
};

export const updateExistHome = async (updatedHome, id) => {
    const home = await Home.findOneAndUpdate(
        {
            _id: id,
        },
        { ...updatedHome },
        {
            returnDocument: "after",
        }
    );

    if (!home) {
        throw new Error("Home item does not exist!");
    }
    return home;
};

export const deleteExistHome = async (id) => {
    const home = await Home.findOneAndDelete({
        _id: id,
    });

    if (!home) {
        throw new Error("Home item does not exist!");
    }

    return home._id;
};

export const createHome = async (newHome) => {
    // we need to use findById after create and don't take the result of create
    // because findById function auto populate 'owner' field but create function does not.
    const home = await Home.create(newHome);
    return await Home.findById(home._id);
};
