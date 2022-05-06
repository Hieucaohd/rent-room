import { InstanceMutation } from '../base-resolver/base.mutation';
import '../../../common/types/typedef';
import { UserService } from '../../../services/model-services/user.service';
import { serializerUser, authenticateUser } from '../../../services/helpers/auth.service';
import { RequestContext } from '../../common/request-context';

export class Register extends InstanceMutation {
    /** @type {MetaInstanceMutation} */
    static meta = {
        modelService: UserService,
        permissions: [],
        permissionsInstance: [],
    };

    /**
     * @param {import('../../../common/types/graphql-types').MutationRegisterArgs} args
     * @param {RequestContext} context
     * @returns
     */
    static cleanInput({ input }, context) {
        return input;
    }

    static cleanInstance(user) {
        return serializerUser(user);
    }

    static handleError(err) {
        // if (err instanceof MongoServerError) {
        //     return new EmailDuplicateError();
        // }
        // return err;
        return new EmailDuplicateError();
    }

    /**
     * @param {UserModel} user
     * @returns {import('../../../common/types/graphql-types').User}
     */
    static successResponse(user) {
        return user;
    }

    static async performMutation(resolverParams, session) {
        const user = await super.performMutation(resolverParams, session);
        const { res } = resolverParams.context;
        authenticateUser(user, res);
        return user;
    }
}
