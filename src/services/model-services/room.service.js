import  Room  from '../../models/Room.js';
import { ObjectId } from 'mongodb';
import '../../common/types/typedef.js';
import { BaseService } from './base.service.js';
import { RequestContext } from '../../graphql/common/request-context.js';

export class RoomService extends BaseService {
    /** @type {import('../../common/types/common-types').MetaBaseService} */
    static meta = {
        model: Room,
    };

    /**
     * Count total rooms in a home.
     *
     * @param {String | ObjectId} homeId
     * @returns {Promise<Number>}
     */
    static async countRoomInHome(homeId, context) {
        return await Room.count({
            home: homeId,
        });
    }

    /**
     * Get all rooms in a home.
     *
     * @param {String | ObjectId} homeId
     * @param {import('../../common/types/graphql-types').PaginatorOptionsInput} paginatorOptions
     * @returns {Promise<RoomPaginator>}
     */
    static async getRoomsInHome(homeId, paginatorOptions, context) {
        return await this.getListInstances({ home: homeId }, paginatorOptions, context);
    }

    /**
     * @param {String | ObjectId} homeId
     * @param {RequestContext} context
     * @returns {Promise<Number>}
     */
    static async getMinPriceInHome(homeId, context) {
        const room = await Room.find({ home: homeId }).sort({ price: 1 }).limit(1);
        return room.price;
    }

    /**
     * @param {String | ObjectId} homeId
     * @param {RequestContext} context
     * @returns {Promise<Number>}
     */
    static async getMaxPriceInHome(homeId, context) {
        const room = await Room.find({ home: homeId }).sort({ price: -1 }).limit(1);
        return room.price;
    }
}
