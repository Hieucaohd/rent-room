import { RequestContext } from '../../graphql/common/request-context';
import HomeComment from '../../models/HomeComment';
import { BaseService } from './base.service';
import { ObjectId } from 'mongoose';
import '../../common/types/typedef';
import { createOptions } from '../helpers/paginator.service';
import Home from '../../models/Home';

export class HomeCommentService extends BaseService {
    /**
     * @param {String | ObjectId} id
     * @param {RequestContext} context
     * @returns {Promise<HomeCommentResult>}
     */
    static async getInstanceById(id, context) {
        const homeComment = await this.getHomeCommentById(id, context);
        return homeComment;
    }

    /**
     * @param {String | ObjectId} homeCommentId
     * @param {RequestContext} context
     * @returns {Promise<HomeCommentModel>}
     */
    static async getHomeCommentById(homeCommentId, context) {
        const homeComment = await HomeComment.findById(homeCommentId);
        return homeComment;
    }

    /**
     * @param {import("../../common/types/graphql-types").QueryAllHomeCommentsArgs} data
     * @param {RequestContext} context
     * @returns {Promise<import("../../common/types/graphql-types").HomeCommentPaginator>}
     */
    static async getListInstances(data, context) {
        const homeCommentPaginator = await this.getHomeComments(data.page, data.limit, data.homeId);
        return homeCommentPaginator;
    }

    /**
     * @param {Number} page
     * @param {Number} limit
     * @param {String | ObjectId} homeId
     * @param {RequestContext} context
     * @returns {Promise<import("../../common/types/graphql-types").HomeCommentPaginator>}
     */
    static async getHomeComments(page, limit, homeId, context) {
        let options = createOptions(page, limit);
        options.sort = {
            createdAt: -1,
        };
        return await HomeComment.paginate({ home: homeId }, options);
    }

    /**
     * @param {import("../../common/types/graphql-types").HomeCommentCreateInput & {user: ObjectId}} data
     * @param {RequestContext} context
     * @param {import("mongoose").ClientSession} session
     * @returns {Promise<HomeCommentModel>}
     */
    static async createInstance(data, context, session) {
        const homeComment = await this.createHomeComment(data, context, session);
        return homeComment;
    }

    /**
     *
     * @param {import("../../common/types/graphql-types").HomeCommentCreateInput & {user: ObjectId}} newHomeComment
     * @param {RequestContext} context
     * @param {import("mongoose").ClientSession} session
     * @returns {Promise<HomeCommentModel>}
     */
    static async createHomeComment(newHomeComment, context, session) {
        let homeComment = await HomeComment.create([{ ...newHomeComment }], { session });
        homeComment = homeComment[0];
        return await HomeComment.findById(homeComment._id).session(session);
    }

    static async updateInstance(data, context, session) {
        throw new Error('This method must be implemented by subclass.');
    }

    static async updateHomeCommentById(updateInfo, id, context, session) {
        const updatedHomeComment = await HomeComment.findByIdAndUpdate(id, {...updateInfo}, {
            returnDocument: 'after' ,

        }) 
    }

    static async deleteInstanceById(id, context, session) {
        throw new Error('This method must be implemented by subclass.');
    }
    static async createHomeComment(newHomeComment, homeId, context, session) {}
}
