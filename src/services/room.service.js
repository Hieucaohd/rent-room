import { Room } from '../models';
import { createOptions } from '../helpers';
import { ObjectId } from 'mongodb';
import '../common/typedef';
import { async } from '@firebase/util';

/**
 * @param {RoomInput} newRoom
 * @returns {Promise<RoomModel>}
 */
export const createRoomInDatabase = async (newRoom) => {
    const room = await Room.create(newRoom);

    return await Room.findById(room._id);
};

/**
 * @param {RoomUpdateInput} updateInfo
 * @param {Scalars['ID']} roomID
 * @returns {Promise<RoomModel>}
 */
export const updateRoomInDatabase = async (updateInfo, roomID) => {
    const updatedRoom = await Room.findOneAndUpdate(
        {
            _id: roomID,
        },
        { ...updateInfo },
        {
            returnDocument: 'after',
        }
    );
    return updatedRoom;
};

/**
 * @param {Scalars['ID']} roomID
 * @returns {Promise<ObjectId>}
 */
export const deleteRoomInDatabase = async (roomID) => {
    const deletedRoom = await Room.findByIdAndDelete(roomID);
    return deletedRoom._id;
};

/**
 * @param {Number} page
 * @param {Number} limit
 * @returns {Promise<RoomPaginator>}
 */
export const getAllRoomsFromDatabase = async (page, limit) => {
    let options = createOptions(page, limit);
    options.sort = {
        createdAt: 1,
    };

    return await Room.paginate({}, options);
};

/**
 * @param {Scalars['ID']} roomId
 * @returns {Promise<RoomModel>}
 */
export const getRoomByIdFromDatabase = async (roomId) => {
    const room = await Room.findById(roomId);
    return room;
};

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
