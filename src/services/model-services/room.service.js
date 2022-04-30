import { Room } from '../../models';
import { createOptions } from '../helpers';
import { ObjectId } from 'mongodb';
import '../../common/types/typedef';
import { BaseService } from './base.service';
import { RequestContext } from '../../graphql/common/request-context';
import { ClientSession } from 'mongoose';

/**
 * Count total rooms in a home.
 *
 * @param {String | ObjectId} homeId
 * @returns {Promise<Number>}
 */
export const countRoomInHome = async (homeId) => {
    return await Room.count({
        home: homeId,
    });
};

/**
 * Get all rooms in a home.
 *
 * @param {String | ObjectId} homeId
 * @param {Number} page
 * @param {Number} limit
 * @returns {Promise<RoomPaginator>}
 */
export const getRoomsInHome = async (homeId, page, limit) => {
    let options = createOptions(page, limit);
    options.sort = {
        createdAt: 1,
    };
    return await Room.paginate(
        {
            home: homeId,
        },
        options
    );
};

export class RoomService extends BaseService {
    /**
     * @param {RoomInput} newRoom
     * @returns {Promise<RoomModel>}
     */
    static async createRoom(newRoom, context, session) {
        let room = await Room.create([{ ...newRoom }], { session });
        room = room[0];

        return await Room.findById(room._id).session(session);
    }

    /**
     * @param {RoomUpdateInput} updateInfo
     * @param {Scalars['ID']} roomId
     * @returns {Promise<RoomModel>}
     */
    static async updateRoom(updateInfo, roomId, context, session) {
        const updatedRoom = await Room.findOneAndUpdate(
            {
                _id: roomId,
            },
            { ...updateInfo },
            {
                returnDocument: 'after',
                session,
            }
        );
        return updatedRoom;
    }

    /**
     * @param {Scalars['ID']} roomID
     * @returns {Promise<ObjectId>}
     */
    static async deleteRoom(roomID, context, session) {
        const deletedRoom = await Room.findByIdAndDelete(roomID, { session });
        return deletedRoom._id;
    }

    /**
     * @param {Number} page
     * @param {Number} limit
     * @returns {Promise<RoomPaginator>}
     */
    static async getAllRooms(page, limit, context) {
        let options = createOptions(page, limit);
        options.sort = {
            createdAt: 1,
        };

        return await Room.paginate({}, options);
    }

    /**
     * @param {Scalars['ID']} roomId
     * @returns {Promise<RoomModel>}
     */
    static async getRoomById(roomId, context) {
        const room = await Room.findById(roomId);
        return room;
    }

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
     * @param {Number} page
     * @param {Number} limit
     * @returns {Promise<RoomPaginator>}
     */
    static async getRoomsInHome(homeId, page, limit, context) {
        let options = createOptions(page, limit);
        options.sort = {
            createdAt: 1,
        };
        return await Room.paginate(
            {
                home: homeId,
            },
            options
        );
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
}
