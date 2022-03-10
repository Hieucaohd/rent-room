import { Home } from "../models";
import { createOptions } from "../helpers";

export const getAllHomes = async (page, limit) => {
    let options = createOptions(page, limit);
    options.sort = {
        createdAt: -1,
    }

    return await Home.paginate({}, options);
};

export const createHome = async (newHome) => {
    return await Home.create(newHome);
};
