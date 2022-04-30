import { Home } from '../../models';
import { createOptions } from '../helpers';
import { ObjectId } from 'mongodb';
import '../../common/types/typedef';
import { BaseService } from './base.service';
import _ from 'lodash';

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

export class HomeService extends BaseService {
    /**
     * @param {Number} page
     * @param {Number} limit
     * @returns {Promise<HomePaginator>}
     */
    static async getAllHomes(page, limit, context) {
        let options = createOptions(page, limit);
        options.sort = {
            createdAt: -1,
        };

        return await Home.paginate({}, options);
    }

    /**
     * @param {HomeUpdateInput} updateInfo
     * @param {Scalars['ID']} homeId
     * @returns {Promise<HomeModel>}
     */
    static async updateHome(updateInfo, homeId, context, session) {
        const home = await Home.findOneAndUpdate(
            {
                _id: homeId,
            },
            { ...updateInfo },
            {
                returnDocument: 'after',
                session: session,
            }
        );

        if (!home) {
            throw new Error('Home item does not exist!');
        }

        return home;
    }

    /**
     * Delete a home in mongodb database.
     * If there any error, throw this err.
     *
     * @param {Scalars['ID']} homeId
     * @returns {Promise<ObjectId>}
     */
    static async deleteHome(homeId, context, session) {
        const home = await Home.findOneAndDelete({ _id: homeId }, { session: session });

        if (!home) {
            throw new Error('Home item does not exist!');
        }

        return home._id;
    }

    /**
     * Create a home in mongodb database.
     * @param {HomeInput} newHome
     * @returns {Promise<HomeModel>}
     */
    static async createHome(newHome, context, session) {
        // we need to use findById after create and don't take the result of create
        // because findById function auto populate 'owner' field but create function does not.
        let home = await Home.create([{ ...newHome }], { session });
        home = home[0];
        return await Home.findById(home._id).session(session);
    }

    /**
     * @param {Scalars['ID']} homeId
     * @returns {Promise<HomeModel>}
     */
    static async getHomeById(homeId, context) {
        return await Home.findById(homeId);
    }

    /**
     * Get all homes create by user.
     *
     * @param {String | ObjectId} userId
     * @param {Number} page
     * @param {Number} limit
     *
     * @returns {Promise<HomePaginator>}
     */
    static async getHomesCreatedByUser(userId, page, limit, context) {
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

    static async getInstanceById(id, context) {
        return await this.getHomeById(id, context);
    }

    static async createInstance(data, context, session) {
        const home = await this.createHome(data, context, session);
        return home;
    }

    static async updateInstance(data, context, session) {
        const homeUpdateInfo = _.omit(data, ['id']);
        const homeId = data.id;
        const home = await this.updateHome(homeUpdateInfo, homeId, context, session);
        return home;
    }

    static async deleteInstanceById(id, context, session) {
        return await this.deleteHome(id, context, session); 
    }

    static async getListInstances(data, context) {
        return await this.getAllHomes(data.page, data.limit, context);
    }
}
