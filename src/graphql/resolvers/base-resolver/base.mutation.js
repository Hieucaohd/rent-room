import '../../../common/types/typedef';
import mongoose from 'mongoose';
import { GraphQLResolveInfo } from 'graphql';
import { RequestContext } from '../../common/request-context';
import { ClientSession } from 'mongoose';

/**
 * This class use template method pattern to control the
 * mutation action. Every Mutation class must be extend 
 * {@link BaseMutation}.
 */
export class BaseMutation {
    /** @type {MetaBaseMutation} */
    static meta;

    /**
     * Perform mutation in transaction.
     * If there any error, rollback transaction and return error to client.
     * **Note:** Do not override this method in subclass except you actually
     * need to do that.
     *
     * @example
     * ```javascript
     * {
     *  Mutation: {
     *   doSomething: MutationClass.mutate.bind(MutationClass),
     *  }
     * }
     * ```
     *
     * @param {Object} source the parent type.
     * @param {Object} args the arguments you defind in typedef.
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
     * Default: the response from subclass of {@link InstanceMutation} is instance be created or updated,
     * the response from subclass of {@link DeleteMutation} is _id of this instance be deleted.
     *
     * @param {any} response result of {@link performMutation}
     * @returns {any} return the {@link response} itself.
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
     * This method handle error from {@link mutate} method.
     *
     * @param {Error} err error throws from {@link mutate} method.
     */
    static handleError(err) {
        throw err;
    }

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

/**
 * This class perform the mutation (update or create) of one instance in database.
 */
export class InstanceMutation extends BaseMutation {
    /** @type {MetaInstanceMutation} */
    static meta = {
        idField: 'id',
    };

    /**
     * If data input have {@link idField} then do UPDATE action else do CREATE action.
     * If you want add extra logic after mutation, let override this method, but remember
     * to call super.performMutation to get the return instance.
     * @example
     * ```javascript
     * static async performMutation(resolverParams, session) {
     *  const instance = await super.performMutation(resolverParams, session);
     *  extraLogic();
     *  return instance;
     * }
     * ```
     *
     * @param {ResolverParams} resolverParams
     * @param {ClientSession} session pass session to service.
     * @returns {any} the instance be updated or created.
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

        instance = await this.cleanInstance(instance, context);
        return instance;
    }

    /**
     * Override this method if you want to transform the {@link args} to
     * the data pass to {@link modelService}.
     *
     * @param {Object} args the arguments you defined in typedef.
     * @param {RequestContext} context
     * @returns {any} the data pass to {@link modelService}. Default return the {@link args} it self.
     */
    static cleanInput(args, context) {
        return args;
    }

    /**
     * Create new instance in database.
     *
     * @param {any} data the result from {@link cleanInput}.
     * @param {RequestContext} context
     * @param {ClientSession} session
     * @returns the new instance created from database.
     */
    static async createInstance(data, context, session) {
        const instance = await this.modelService.createInstance(data, context, session);
        return instance;
    }

    /**
     * Get instance from database to check permission instance for UPDATE action.
     * This method is called before UPDATE action to check the {@link permissionsInstance} of
     * user to that instance.
     * Default this method find instance by id, if you want to change the way it find instance, let override
     * it.
     *
     * @param {any} data the result from {@link cleanInput}.
     * @param {RequestContext} context
     * @returns the instance from database.
     */
    static async getInstance(data, context) {
        const id = data[this.idField];
        const instance = await this.modelService.getInstanceById(id, context);

        if (!instance) {
            throw new Error('Instance not found.');
        }

        return instance;
    }

    /**
     * Check user permission of instance for UPDATE action.
     *
     * @param {UserModel} user
     * @param {any} instance the instance return from {@link getInstance}.
     */
    static async checkPermissionsInstance(user, instance) {
        for (const permission of this.permissionsInstance) {
        }
    }

    /**
     * Update instance from database.
     *
     * @param {any} data the result from {@link cleanInput}.
     * @param {RequestContext} context
     * @param {ClientSession} session
     * @returns the updated instance from database.
     */
    static async updateInstance(data, context, session) {
        const instance = await this.modelService.updateInstance(data, context, session);
        return instance;
    }

    /**
     * If you want to hide some information of instance before return to client
     * let override thif method. Hide some sensitive information from instance before return
     * to client.
     *
     * @param {any} instance the instance return from database.
     * @returns {any}
     */
    static cleanInstance(instance, context) {
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

/**
 * This class perform delete of one instance in database.
 */
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
        let data = await this.cleanInput(args, context);
        const instance = await this.getInstance(data, context);
        await this.checkPermissionsInstance(context.user, instance);
        const id = data[this.idField];
        const idDeletedInstance = await this.modelService.deleteInstanceById(id, context, session);
        return idDeletedInstance;
    }

    static cleanInput(args, context) {
        return args;
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
