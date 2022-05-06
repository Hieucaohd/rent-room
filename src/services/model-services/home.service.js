import Home from '../../models/Home';
import { ObjectId } from 'mongodb';
import '../../common/types/typedef';
import { BaseService } from './base.service';

export class HomeService extends BaseService {
    /** @type {import('../../common/types/common-types').MetaBaseService} */
    static meta = {
        model: Home,
    };

    /**
     * Get all homes create by user.
     *
     * @param {String | ObjectId} userId
     * @param {Number} page
     * @param {Number} limit
     *
     * @returns {Promise<HomePaginator>}
     */
    static async getHomesCreatedByUser(userId, paginatorOptions, context) {
        return await this.getListInstances({ owner: userId }, paginatorOptions, context);
    }
}
