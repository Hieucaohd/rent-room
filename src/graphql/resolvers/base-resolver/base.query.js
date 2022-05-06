import '../../../common/types/typedef';

/**
 * This class use template method pattern to control
 * the query action. Every query class must be extend {@link BaseQuery}.
 */
export class BaseQuery {
    /** @type {MetaBaseQuery} */
    static meta;

    static async query(source, args, context, info) {
        try {
            await this.checkPermissions(context.user);

            /** @type {ResolverParams} */
            const resolverParams = {
                source,
                args,
                context,
                info,
            };
            const response = await this.performQuery(resolverParams);
            return await this.successResponse(response);
        } catch (err) {
            err = await this.handleError(err);
            return await this.errorResponse(err);
        }
    }

    static checkPermissions(user) {}

    static successResponse(response) {
        return response;
    }

    static handleError(err) {
        return err;
    }

    static errorResponse(err) {
        return err;
    }

    static async performQuery(resolverParams) {
        throw new Error('This method must be implemented by subclass.');
    }

    static get permissions() {
        return this.meta.permissions;
    }
}

/**
 * Extend this class to query one instance from database.
 */
export class InstanceQuery extends BaseQuery {
    /** @type {MetaInstanceQuery} */
    static meta;

    static async performQuery(resolverParams) {
        let { args, context } = resolverParams;
        let data = await this.cleanInput(args, context);
        let instance = await this.getInstance(data, context);
        await this.checkPermissionsInstance(context.user, instance);
        instance = await this.cleanInstance(instance);
        return instance;
    }

    static async checkPermissionsInstance(user, instance) {}

    static async getInstance(data, context) {
        const id = data[this.idField];
        return await this.modelService.getInstanceById(id, context);
    }

    static cleanInput(args, context) {
        return args;
    }

    static cleanInstance(instance) {
        return instance;
    }

    static get permissionsInstance() {
        return this.meta.permissionsInstance;
    }

    static get modelService() {
        return this.meta.modelService;
    }

    static get fieldsReturn() {
        return this.meta.fieldsReturn;
    }

    static get idField() {
        return this.meta.idField;
    }
}

/**
 * Extend this class to query list of instances from database.
 */
export class ListQuery extends BaseQuery {
    /** @type {MetaListQuery} */
    static meta;

    static async performQuery(resolverParams) {
        let { args, context } = resolverParams;
        let { query, paginatorOptions } = await this.cleanInput(args, context);
        let instances = await this.getListInstances(query, paginatorOptions, context);
        instances = this.cleanListInstances(instances);
        return instances;
    }

    static async getListInstances(query, { page, limit, sort }, context) {
        return await this.modelService.getListInstances(query, { page, limit, sort }, context);
    }

    static async cleanListInstances(instances) {
        return instances;
    }

    static cleanInput(args, context) {
        return args;
    }

    static get modelService() {
        return this.meta.modelService;
    }

    static get fieldsReturn() {
        return this.meta.fieldsReturn;
    }
}
