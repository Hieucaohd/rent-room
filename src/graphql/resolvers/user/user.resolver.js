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
import { UserUpdate } from './user.mutation';
import { UserById } from './user.query';

export default {
  Mutation: {
    updateUser: UserUpdate.mutate.bind(UserUpdate),
  },

  Query: {
    getUserById: UserById.query.bind(UserById),
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
