import { HomeService } from '../../../services/model-services/home.service';
import { DeleteMutation, InstanceMutation } from '../base-resolver/base-mutation';

let metaHomeMutation = {
    modelService: HomeService,
};

export class HomeCreate extends InstanceMutation {
    static meta = {
        permissions: [],
        permissionsInstance: [],
        ...metaHomeMutation,
    };

    static cleanInput(args, context) {
        let { newHome } = args;
        newHome.owner = context.user._id;
        return newHome;
    }
}

export class HomeUpdate extends InstanceMutation {
    static meta = {
        permissions: [],
        permissionsInstance: [],
        ...metaHomeMutation,
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
    static meta = {
        ...metaHomeMutation,
        idField: 'id',
        permissions: [],
    };
}
