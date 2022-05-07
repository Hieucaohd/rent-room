import { DeleteMutation, InstanceMutation } from '../base-resolver/base.mutation';
import '../../../common/types/typedef';
import { HomeCommentService } from '../../../services/model-services/home-comment.service';
import { RequestContext } from '../../common/request-context';

export class HomeCommentCreate extends InstanceMutation {
    /** @type {MetaInstanceMutation} */
    static meta = {
        permissions: [],
        permissionsInstance: [],
        modelService: HomeCommentService,
    };

    /**
     * @param {import('../../../common/types/graphql-types').MutationCreateHomeCommentArgs} param0
     * @param {RequestContext} context
     */
    static cleanInput({ input }, context) {
        input.user = context.user;
        return input;
    }
}

export class HomeCommentUpdate extends InstanceMutation {
    /** @type {MetaInstanceMutation} */
    static meta = {
        permissions: [],
        permissionsInstance: [],
        modelService: HomeCommentService,
    };
}

export class HomeCommentDelete extends DeleteMutation {
    /** @type {MetaDeleteMutation} */
    static meta = {
        permissions: [],
        permissionsInstance: [],
        modelService: HomeCommentService 
    }
}
