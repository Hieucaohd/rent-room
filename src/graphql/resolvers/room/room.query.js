import { RoomService } from "../../../services/model-services/room.service";
import { InstanceQuery, ListQuery } from "../base-resolver/base-query";

export class RoomById extends InstanceQuery {
	/** @type {MetaInstanceQuery} */
	static meta = {
		idField: "roomId",
		modelService: RoomService,
		permissions: [],
		permissionsInstance: []
	}
}

export class ListRoom extends ListQuery {
	/** @type {MetaListQuery} */
	static meta = {
		modelService: RoomService,
		permissions: []
	}
}