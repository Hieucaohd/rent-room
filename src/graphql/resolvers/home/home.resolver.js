import { HomeCreate, HomeDelete, HomeUpdate } from './home.mutation';
import { ListHome, HomeById } from './home.query';
import {
    getDistrictNameByCode,
    getProvinceNameByCode,
    getWardNameByCode,
} from '../../../services/helpers/address.service';
import {
    countRoomInHome,
    getRoomsInHome,
    RoomService,
} from '../../../services/model-services/room.service';
import '../../../common/types/typedef';

export default {
    Mutation: {
        createNewHome: HomeCreate.mutate.bind(HomeCreate),
        updateHome: HomeUpdate.mutate.bind(HomeUpdate),
        deleteHome: HomeDelete.mutate.bind(HomeDelete),
    },
    Query: {
        allHomes: ListHome.query.bind(ListHome),
        getHomeById: HomeById.query.bind(HomeById),
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

        /**
         * @param {HomeResult} source
         * @returns {Number}
         */
        minPrice: async (source, args, context) => {
            if (!source.minPrice) {
                return await RoomService.getMinPriceInHome(source._id, context);
            }

            return source.minPrice;
        },

        /**
         * @param {HomeResult} source
         * @returns {Number}
         */
        maxPrice: async (source) => {
            if (!source.maxPrice) {
                return await RoomService.getMaxPriceInHome(source._id, context);
            }

            return source.maxPrice;
        },
    },
};
