import { InstanceQuery } from '../base-resolver/base.query';
import '../../../common/types/typedef';
import { UserService } from '../../../services/model-services/user.service';
import { serializerUser, authenticateUser } from '../../../services/helpers/auth.service';

export class Login extends InstanceQuery {
    /** @type {MetaInstanceQuery} */
    static meta = {
        modelService: UserService,
        permissions: [],
        permissionsInstance: [],
    };

    static async getInstance(data, context) {
        const user = await this.modelService.getUserByEmailAndPassword(
            data.email,
            data.password,
            context
        );
        return user;
    }

    static cleanInstance(user) {
        return serializerUser(user);
    }

    /**
     * @param {UserResult} user 
     * @returns {AuthResponse}
     */
    static successResponse(user) {
        return user;
    }

    static async performQuery(resolverParams) {
        const user = await super.performQuery(resolverParams);
        const { res } = resolverParams.context;
        authenticateUser(user, res);
        return user;
    }
}
