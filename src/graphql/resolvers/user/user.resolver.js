import { serializerUser } from '../../../services/helpers/auth.service';
import { updateUserInDatabase } from '../../../services/model-services/user.service';
import { HomeService } from '../../../services/model-services/home.service';
import '../../../common/types/typedef';
import {
    getDistrictNameByCode,
    getProvinceNameByCode,
    getWardNameByCode,
} from '../../../services/helpers/address.service';
import { RequestContext } from '../../common/request-context';

export default {
    Mutation: {
        updateUser: async (_, { input }, { user }) => {
            let userUpdated = await updateUserInDatabase(input, user);
            userUpdated = serializerUser(userUpdated);

            return userUpdated;
        },
    },

    User: {
        /**
         * @param {UserResult} source
         * @param {import('../../../common/types/graphql-types').UserListHomesArgs} param1
         * @param {RequestContext} context
         * @returns {Promise<HomePaginator>}
         */
        listHomes: async (source, { paginatorOptions }, context) => {
            return await HomeService.getHomesCreatedByUser(source._id, paginatorOptions, context);
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
