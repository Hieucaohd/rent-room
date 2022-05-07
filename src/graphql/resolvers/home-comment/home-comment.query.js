import { HomeCommentService } from "../../../services/model-services/home-comment.service";
import { InstanceQuery, ListQuery } from "../base-resolver/base.query";

export class HomeCommentById extends InstanceQuery {
	/** @type {MetaInstanceQuery} */
	static meta = {
		permissions: [],
		permissionsInstance: [],
		modelService: HomeCommentService,
	}
}

export class ListHomeComments extends ListQuery {
	/** @type {MetaListQuery} */
	static meta = {
		permissions: [],
		modelService: HomeCommentService
	}
}