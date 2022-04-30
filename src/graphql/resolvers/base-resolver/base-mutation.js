import '../../../common/types/typedef';
import mongoose from 'mongoose';
import { GraphQLResolveInfo } from 'graphql';
import { RequestContext } from '../../common/request-context';
import { ClientSession } from 'mongoose';
import { BaseService } from '../../../services/model-services/base.service';

export class BaseMutation {
    /** @type {MetaBaseMutation} */
    static meta;

    /**
     * Perform mutation in transaction.
     * If there any error, rollback transaction and return error to client.
     *
     * @param {Object} source
     * @param {Object} args
     * @param {RequestContext} context
     * @param {GraphQLResolveInfo} info
     * @returns {Promise<any>}
     */
    static async mutate(source, args, context, info) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await this.checkPermissions(context.user);

            const resolverQLParams = {
                source,
                args,
                context,
                info,
            };
            let response = await this.performMutation(resolverQLParams, session);

            await session.commitTransaction();
            session.endSession();

            return await this.successResponse(response);
        } catch (err) {
            await session.abortTransaction();
            session.endSession();

            await this.handleError(err);
            return await this.errorResponse(err);
        }
    }

    /**
     * @description
     * Check permission of user.
     *
     * @param {UserModel} user
     */
    static async checkPermissions(user) {
        for (const permission of this.permissions) {
        }
    }

    /**
     * Custom response return to client.
     * @default response itself.
     *
     * @param {any} response
     */
    static successResponse(response) {
        return response;
    }

    /**
     * Return frendly error to client.
     * This method should be override by subclass.
     *
     * @param {Error} err
     * @returns {any}
     */
    static errorResponse(err) {
        console.log(err);
        return null;
    }

    /**
     * Change the {@link err} object.
     *
     * @param {Error} err
     * @returns {any}
     */
    static handleError(err) {}

    /**
     * Implement login of mutation here.
     *
     * @param {ResolverParams} resolverQLParams
     * @param {ClientSession} session
     * @throws {Error} if this method is not implemented by subclass.
     */
    static async performMutation(resolverQLParams, session) {
        throw new Error('This method must be implemented by subclass.');
    }

    static get permissions() {
        return this.meta.permissions;
    }
}

export class InstanceMutation extends BaseMutation {
    /** @type {MetaInstanceMutation} */
    static meta = {
        idField: 'id',
    };

    /**
     * This is where main action of mutation: set up data input, connect to service,
     * clean return instance.
     *
     * If data input have {@link idField} then do update action else do create action.
     *
     * @param {ResolverParams} resolverParams
     * @param {ClientSession} session
     */
    static async performMutation(resolverParams, session) {
        let { args, context } = resolverParams;
        let data = await this.cleanInput(args, context);

        let instance;
        if (this.idField && data[this.idField]) {
            const originalInstance = await this.getInstance(data, context);
            await this.checkPermissionsInstance(context.user, originalInstance);
            instance = await this.updateInstance(data, context, session);
        } else {
            instance = await this.createInstance(data, context, session);
        }

        instance = await this.cleanInstance(instance);
        return instance;
    }

    /**
     * Choose which data to pass to database here.
     *
     * @param {UserModel} user
     * @param {any} instance
     */
    static cleanInput(args, context) {
        return args;
    }

    /**
     * Create new instance in database.
     *
     * @param {any} data input data to create instance.
     * @param {RequestContext} context
     * @param {ClientSession} session
     * @returns the instance from database.
     */
    static async createInstance(data, context, session) {
        const instance = await this.modelService.createInstance(data, context, session);
        return instance;
    }

    /**
     * Get instance from database to check permission instance for update action.
     * Default this method find instance by id, if you want to change the way, let override
     * it.
     *
     * @param {any} data input data.
     * @param {RequestContext} context
     * @returns the instance from database.
     */
    static async getInstance(data, context) {
        const id = data[this.idField];
        const instance = await this.modelService.getInstanceById(id, context);
        return instance;
    }

    /**
     * Check user permission of instance.
     *
     * @param {UserModel} user
     * @param {any} instance
     */
    static async checkPermissionsInstance(user, instance) {
        for (const permission of this.permissionsInstance) {
        }
    }

    /**
     * Update instance from database.
     *
     * @param {any} data data input to update instance.
     * @param {RequestContext} context
     * @param {ClientSession} session
     * @returns the updated instance from database.
     */
    static async updateInstance(data, context, session) {
        const instance = await this.modelService.updateInstance(data, context, session);
        return instance;
    }

    /**
     * Choose which information to return to client.
     * Hide some sensitive information from instance before return
     * to client.
     *
     * @param {any} instance the instance return from database.
     * @returns {any}
     */
    static cleanInstance(instance) {
        return instance;
    }

    static get idField() {
        return this.meta.idField;
    }

    static get modelService() {
        return this.meta.modelService;
    }

    static get permissionsInstance() {
        return this.meta.permissionsInstance;
    }
}

export class DeleteMutation extends BaseMutation {
    /** @type {MetaDeleteMutation} */
    static meta = {
        idField: 'id',
    };

    /**
     * @param {ResolverParams} resolverParams
     * @param {ClientSession} session
     */
    static async performMutation(resolverParams, session) {
        const { context, args } = resolverParams;
        let data = args;
        const instance = await this.getInstance(data, context);
        await this.checkPermissionsInstance(context.user, instance);
        const id = data[this.idField];
        return await this.modelService.deleteInstanceById(id, context, session);
    }

    static checkPermissionsInstance(user, instance) {}

    static async getInstance(data, context) {
        const instance = await this.modelService.getInstanceById(data[this.idField], context);
        return instance;
    }

    static get idField() {
        return this.meta.idField;
    }

    static get modelService() {
        return this.meta.modelService;
    }
}

export class BulkMutation extends BaseMutation {}
