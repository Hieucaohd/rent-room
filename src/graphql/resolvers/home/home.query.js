import { HomeService } from "../../../services/model-services/home.service";
import '../../../common/types/typedef'
import { InstanceQuery, ListQuery } from "../base-resolver/base.query";

let metaHomeQuery = {
	modelService: HomeService
}

export class HomeById extends InstanceQuery {
	/** @type {MetaInstanceQuery} */
	static meta = {
		...metaHomeQuery,
		permissions: [],
		permissionsInstance: [],
		idField: 'homeId',
	}
}

export class ListHome extends ListQuery {
	/** @type {MetaListQuery} */
	static meta = {
		...metaHomeQuery,
		permissions: []
	}
}