import { RoomService } from '../../../services/model-services/room.service';
import { InstanceQuery, ListQuery } from '../base-resolver/base.query';

export class RoomById extends InstanceQuery {
    /** @type {MetaInstanceQuery} */
    static meta = {
        idField: 'roomId',
        modelService: RoomService,
        permissions: [],
        permissionsInstance: [],
    };
}

export class ListRoom extends ListQuery {
    /** @type {MetaListQuery} */
    static meta = {
        modelService: RoomService,
        permissions: [],
    };
}

export class ListRoomByIds extends ListQuery {
    /** @type {MetaListQuery} */
    static meta = {
        modelService: RoomService,
        permissions: [],
    };

    static async getListInstances(data, context) {
        return await RoomService.getListRoomById(data.page, data.limit, data.listIds, context);
    }
}
