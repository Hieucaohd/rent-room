import {
    getDistrictNameByCode,
    getProvinceNameByCode,
    getWardNameByCode,
} from '../../helpers/address.service';
import {
    getAllHomesFromDatabase,
    createHomeInDatabase,
    updateHomeInDatabase,
    deleteHomeInDatabase,
    getHomeByIdFromDatabase,
} from '../../services/home.service';
import { countRoomInHome, getRoomsInHome } from '../../services/room.service';
import '../../common/typedef';

export default {
    Query: {
        allHomes: async (_, { page, limit }) => {
            return await getAllHomesFromDatabase(page, limit);
        },

        getHomeById: async (_, { homeId }) => {
            return await getHomeByIdFromDatabase(homeId);
        },
    },

    Mutation: {
        createNewHome: async (_, { newHome }, { user }) => {
            newHome.owner = user._id;
            return await createHomeInDatabase(newHome);
        },

        updateHome: async (_, { updatedHome, id }) => {
            return await updateHomeInDatabase(updatedHome, id);
        },

        deleteHome: async (_, { id }) => {
            return await deleteHomeInDatabase(id);
        },
    },

    Home: {
        /**
         * @param {HomeResult} source
         * @returns {Promise<Number>}
         */
        totalRooms: async (source) => {
            const roomNumber = await countRoomInHome(source._id);
            if (roomNumber === 0) {
                return source.totalRooms;
            }
            return roomNumber;
        },

        /**
         * @param {HomeResult} source
         * @param {Object} param1
         * @param {Number} param1.page
         * @param {Number} param1.limit
         * @returns {Promise<RoomPaginator>}
         */
        listRooms: async (source, { page, limit }) => {
            return await getRoomsInHome(source._id, page, limit);
        },

        /**
         * @param {HomeResult} source
         * @returns {String}
         */
        provinceName: (source) => {
            return getProvinceNameByCode(source.province);
        },

        /**
         * @param {HomeResult} source
         * @returns {String}
         */
        districtName: (source) => {
            return getDistrictNameByCode(source.district);
        },

        /**
         * @param {HomeResult} source
         * @returns {String}
         */
        wardName: (source) => {
            return getWardNameByCode(source.ward);
        },
    },
};
