import { RoomService } from '../../../services/model-services/room.service';
import { RequestContext } from '../../common/request-context';
import { DeleteMutation, InstanceMutation } from '../base-resolver/base.mutation';

export class RoomCreate extends InstanceMutation {
    /** @type {MetaInstanceMutation} */
    static meta = {
        modelService: RoomService,
        permissions: [],
        permissionsInstance: [],
    };

    /**
     * @param {import("../../../common/types/graphql-types").MutationCreateNewRoomArgs} args
     * @param {RequestContext} context
     */
    static cleanInput({ input }, context) {
        return input;
    }
}

export class RoomUpdate extends InstanceMutation {
    /** @type {MetaInstanceMutation} */
    static meta = {
        modelService: RoomService,
        permissions: [],
        permissionsInstance: [],
        idField: 'id',
    };

    static cleanInput({ input }, context) {
        return input;
    }
}

export class RoomDelete extends DeleteMutation {
    /** @type {MetaDeleteMutation} */
    static meta = {
        idField: 'id',
        modelService: RoomService,
        permissions: [],
        permissionsInstance: [],
    };
}
