import { HomeService } from '../../../services/model-services/home.service';
import { DeleteMutation, InstanceMutation } from '../base-resolver/base.mutation';

export class HomeCreate extends InstanceMutation {
    /** @type {MetaInstanceMutation} */
    static meta = {
        modelService: HomeService,
        permissions: [],
        permissionsInstance: [],
    };

    static cleanInput({ input }, context) {
        input.owner = context.user._id;
        return input;
    }
}

export class HomeUpdate extends InstanceMutation {
    /** @type {MetaInstanceMutation} */
    static meta = {
        modelService: HomeService,
        permissions: [],
        permissionsInstance: [],
        idField: 'id',
    };

    static cleanInput({ input }, context) {
        return input;
    }
}

export class HomeDelete extends DeleteMutation {
    /** @type {MetaDeleteMutation} */
    static meta = {
        modelService: HomeService,
        permissions: [],
        idField: 'id',
    };
}
