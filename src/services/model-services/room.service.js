import  Room  from '../../models/Room';
import { ObjectId } from 'mongodb';
import '../../common/types/typedef';
import { BaseService } from './base.service';
import { RequestContext } from '../../graphql/common/request-context';

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
        let numberRooms = await this.countRoomInHome(homeId, context);
        if (!numberRooms) {
            return 0;
        }

        let room = await Room.find({ home: homeId }).sort({ price: 1 }).limit(1);
        room = room[0]
        return room.price;
    }

    /**
     * @param {String | ObjectId} homeId
     * @param {RequestContext} context
     * @returns {Promise<Number>}
     */
    static async getMaxPriceInHome(homeId, context) {
        let numberRooms = await this.countRoomInHome(homeId, context);
        if (!numberRooms) {
            return 0;
        }

        let room = await Room.find({ home: homeId }).sort({ price: -1 }).limit(1);
        room = room[0];
        return room.price;
    }

    static async getInstanceById(id, context) {
        const room = await this.getRoomById(id, context);
        return room;
    }

    static async getListInstances(data, context) {
        return await this.getAllRooms(data.page, data.limit, context);
    }

    static async createInstance(data, context, session) {
        const room = await this.createRoom(data, context, session);
        return room;
    }

    /**
     *
     * @param {import('../../common/types/graphql-types').MutationUpdateRoomArgs} data
     * @param {RequestContext} context
     * @param {ClientSession} session
     * @returns
     */
    static async updateInstance(data, context, session) {
        const room = await this.updateRoom(data.updatedRoom, data.id, context, session);
        return room;
    }

    static async deleteInstanceById(id, context, session) {
        return await this.deleteRoom(id, context, session);
    }

    static async getListRoomById(page, limit, listIds, context) {
        let options = createOptions(page, limit);
        options.sort = {
            createdAt: -1,
        };

        return await Room.paginate({ _id: { $in: listIds } }, options);
    }
}
