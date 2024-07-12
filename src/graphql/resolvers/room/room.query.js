import { RoomService } from '../../../services/model-services/room.service';
import { InstanceQuery, ListQuery } from '../base-resolver/base.query';
import { ObjectID } from 'mongodb';

export class RoomById extends InstanceQuery {
  /** @type {MetaInstanceQuery} */
  static meta = {
    idField: 'id',
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

  static cleanInput({ query, paginatorOptions }, context) {
    let cleanedInput = super.cleanInput({ query, paginatorOptions }, context);
    let { ids } = cleanedInput.query;
    ids = ids.map((id) => ObjectID(id));
		let _query = {
			_id: {
				$in: ids
			}
		}
    return {
      query: _query,
      paginatorOptions: cleanedInput.paginatorOptions,
    };
  }
}
