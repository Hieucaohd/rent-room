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
     * 
     * @param {import('../../../common/types/graphql-types').MutationRegisterArgs} args 
     * @param {RequestContext} context 
     * @returns 
     */
    static cleanInput(args, context) {
        const { newUser } = args;
        return newUser;
    }

    static cleanInstance(user) {
        return serializerUser(user);
    }

    static successResponse(user) {
        return { user };
    }

    static async performMutation(resolverParams, session) {
        const user = await super.performMutation(resolverParams, session);
        const { res } = resolverParams.context;
        authenticateUser(user, res);
        return user;
    }
}
