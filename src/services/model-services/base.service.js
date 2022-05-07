import { Document, Model } from 'mongoose';
import { InstanceNotExistError } from '../../common/errors/graphql-errors';
import { RequestContext } from '../../graphql/common/request-context';
import { createOptions } from '../helpers/paginator.service';

export class BaseService {
    /** @type {import('../../common/types/common-types').MetaBaseService} */
    static meta;

    /**
     * Get the instance by id.
     * @param {String | ObjectId} id
     * @param {RequestContext} context
     * @returns {Promise<any>}
     */
    static async getInstanceById(id, context) {
        const instance = await this.model.findById(id);
        if (!instance) {
            throw new InstanceNotExistError();
        }
        return instance;
    }

    /**
     * @param {Object} query
     * @param {RequestContext} context
     * @returns {Promise<Document>}
     */
    static async getInstance(query, context) {
        let instance = await this.model.findOne(query);
        if (!instance) {
            throw new InstanceNotExistError();
        }
        return instance;
    }

    /**
     * @param {Object} query
     * @param {import('../../common/types/graphql-types').PaginatorOptionsInput} param1
     * @param {RequestContext} context
     * @returns {Promise<import("../../common/types/graphql-types").PaginatorResult>}
     */
    static async getListInstances(query, { page, limit, sort }, context) {
        let options = createOptions(page, limit);

        /**
         * @param {Array<import('../../common/types/graphql-types').SortOption>} sort
         */
        function constructSortOptions(sort) {
            let constructSort = {};
            for (const item of sort) {
                constructSort[item.field] = item.arrange === 'ASC' ? 1 : -1;
            }
            return constructSort;
        }

        if (sort) {
            options.sort = constructSortOptions(sort);
        }

        query = !!query ? query : {};
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

    static get model() {
        return this.meta.model;
    }
}
