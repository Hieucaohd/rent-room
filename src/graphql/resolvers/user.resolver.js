import { serializerUser } from '../../helpers/auth.service';
import { updateUserInDatabase } from '../../services/user.service';
import { getHomesCreatedByUser } from '../../services/home.service';
import '../../common/typedef';
import {
    getDistrictNameByCode,
    getProvinceNameByCode,
    getWardNameByCode,
} from '../../helpers/address.service';

export default {
    Mutation: {
        updateUser: async (_, { updateInfo }, { user }) => {
            let userUpdated = await updateUserInDatabase(updateInfo, user);
            userUpdated = serializerUser(userUpdated);

            return userUpdated;
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
