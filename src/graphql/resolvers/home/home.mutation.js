import { HomeService } from '../../../services/model-services/home.service';
import { DeleteMutation, InstanceMutation } from '../base-resolver/base.mutation';

export class HomeCreate extends InstanceMutation {
    /** @type {MetaInstanceMutation} */
    static meta = {
        modelService: HomeService,
        permissions: [],
        permissionsInstance: [],
    };

    static cleanInput(args, context) {
        let { newHome } = args;
        newHome.owner = context.user._id;
        return newHome;
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

    static cleanInput(args, context) {
        const { updatedHome, id } = args;
        const dataInput = {
            ...updatedHome,
            id,
        };
        return dataInput;
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
