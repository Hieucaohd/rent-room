import { Home } from '../models';
import { createOptions } from '../helpers';
import { ObjectId } from 'mongodb';
import '../common/typedef';
import { options } from 'nodemon/lib/config';

/**
 * @param {Number} page
 * @param {Number} limit
 * @returns {Promise<HomePaginator>}
 */
export const getAllHomesFromDatabase = async (page, limit) => {
    let options = createOptions(page, limit);
    options.sort = {
        createdAt: -1,
    };

    return await Home.paginate({}, options);
};

/**
 * @param {HomeUpdateInput} updateInfo
 * @param {Scalars['ID']} homeID
 * @returns {Promise<HomeModel>}
 */
export const updateHomeInDatabase = async (updateInfo, homeID) => {
    const home = await Home.findOneAndUpdate(
        {
            _id: homeID,
        },
        { ...updateInfo },
        {
            returnDocument: 'after',
        }
    );

    if (!home) {
        throw new Error('Home item does not exist!');
    }
    return home;
};

/**
 * Delete a home in mongodb database.
 * If there any error, throw this err.
 *
 * @param {Scalars['ID']} homeID
 * @returns {Promise<ObjectId>}
 */
export const deleteHomeInDatabase = async (homeID) => {
    const home = await Home.findOneAndDelete({
        _id: homeID,
    });

    if (!home) {
        throw new Error('Home item does not exist!');
    }

    return home._id;
};

/**
 * Create a home in mongodb database.
 * @param {HomeInput} newHome
 * @returns {Promise<HomeModel>}
 */
export const createHomeInDatabase = async (newHome) => {
    // we need to use findById after create and don't take the result of create
    // because findById function auto populate 'owner' field but create function does not.
    const home = await Home.create(newHome);
    return await Home.findById(home._id);
};

/**
 * @param {Scalars['ID']} homeId
 * @returns {Promise<HomeModel>}
 */
export const getHomeByIdFromDatabase = async (homeId) => {
    return await Home.findById(homeId);
};

/**
 * Get all homes create by user.
 *
 * @param {String | ObjectId} userId
 * @param {Number} page
 * @param {Number} limit
 *
 * @returns {Promise<HomePaginator>}
 */
export async function getHomesCreatedByUser(userId, page, limit) {
    let options = createOptions(page, limit);
    options.sort = {
        createdAt: 1,
    };

    return await Home.paginate(
        {
            owner: userId,
        },
        options
    );
}
