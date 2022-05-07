import { serializerUser } from '../../../services/helpers/auth.service';
import { updateUserInDatabase } from '../../../services/model-services/user.service';
import { getHomesCreatedByUser } from '../../../services/model-services/home.service';
import '../../../common/types/typedef';
import {
    getDistrictNameByCode,
    getProvinceNameByCode,
    getWardNameByCode,
} from '../../../services/helpers/address.service';
import User from '../../../models/User';

export default {
    Mutation: {
        updateUser: async (_, { updateInfo }, { user }) => {
            let userUpdated = await updateUserInDatabase(updateInfo, user);
            userUpdated = serializerUser(userUpdated);

            return userUpdated;
        },
    },

    Query: {
        getUserById: async (_, { id }) => {
            let user = await User.findById(id);
            user = serializerUser(user);
            return user;
        },
    },

    User: {
        /**
         * @param {UserResult} source
         * @param {Object} param1
         * @param {Number} param1.page
         * @param {Number} param1.limit
         * @returns {Promise<HomePaginator>}
         */
        listHomes: async (source, { page, limit }) => {
            return await getHomesCreatedByUser(source._id, page, limit);
        },

        /**
         * @param {UserResult} source
         * @returns {String}
         */
        provinceName: (source) => {
            return getProvinceNameByCode(source.province);
        },

        /**
         * @param {UserResult} source
         * @returns {String}
         */
        districtName: (source) => {
            return getDistrictNameByCode(source.district);
        },

        /**
         * @param {UserResult} source
         * @returns {String}
         */
        wardName: (source) => {
            return getWardNameByCode(source.ward);
        },
    },
};
