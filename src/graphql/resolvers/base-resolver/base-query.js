import '../../../common/types/typedef';

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
            await this.handleError(err);
            return await this.errorResponse(err);
        }
    }

    static checkPermissions(user) {}

    static successResponse(response) {
        return response;
    }

    static handleError(err) {}

    static errorResponse(err) {
        console.log(err);
        return null;
    }

    static async performQuery(resolverParams) {
        throw new Error('This method must be implemented by subclass.');
    }

    static get permissions() {
        return this.meta.permissions;
    }
}

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

export class ListQuery extends BaseQuery {
    /** @type {MetaListQuery} */
    static meta;

    static async performQuery(resolverParams) {
        let { args, context } = resolverParams;
        let data = await this.cleanInput(args, context);
        let instances = await this.getListInstances(data, context);
        instances = this.cleanListInstances(instances);
        return instances;
    }

    static async getListInstances(data, context) {
        return await this.modelService.getListInstances(data, context);
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
