import { Document, Model } from 'mongoose';
import { RequestContext } from '../../graphql/common/request-context';
import { createOptions } from '../helpers/paginator.service';

export class BaseService {
    /** @type {Model} */
    static model;

    /**
     * Get the instance by id.
     * @param {String | ObjectId} id
     * @param {RequestContext} context
     * @returns {Promise<any>}
     */
    static async getInstanceById(id, context) {
        return await this.model.findById(id);
    }

    /**
     * @param {Object} query
     * @param {Object} param1
     * @param {Number} param1.page
     * @param {Number} param1.limit
     * @param {RequestContext} context
     * @returns {Promise<import("../../common/types/graphql-types").PaginatorResult>}
     */
    static async getListInstances(query, { page, limit, sort }, context) {
        let options = createOptions(page, limit);
        options.sort = sort;
        let listInstances = await this.model.paginate(query, options);
        return listInstances;
    }

    /**
     * @param {any} data
     * @param {RequestContext} context
     * @param {import('mongoose').ClientSession} session
     * @returns {Promise<Document>}
     */
    static async createInstance(data, context, session) {
        /** @type {Array<Document>} */
        let instance = await this.model.create([data], { session });
        instance = instance[0];
        return await this.model.findById(instance._id).session(session);
    }

    static async updateInstanceById(data, id, context, session) {
        let updatedInstance = await this.model.findByIdAndUpdate(id, data, {
            returnDocument: 'after',
            session,
        });
        return updatedInstance;
    }

    /**
     * @param {String | import('mongoose').ObjectId} id
     * @param {RequestContext} context
     * @param {import('mongoose').ClientSession} session
     * @returns {Promise<import('mongoose').ObjectId>}
     */
    static async deleteInstanceById(id, context, session) {
        let deletedInstance = await this.model.findByIdAndDelete(id, { session });
        return deletedInstance._id;
    }
}
