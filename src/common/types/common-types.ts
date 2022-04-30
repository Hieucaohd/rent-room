import { GraphQLResolveInfo } from "graphql";
import { RequestContext } from '../../graphql/common/request-context';
import { BaseService } from "../../services/model-services/base.service";

export type Province = {
	name: String,
	code: Number,
}

export type District = {
	name: String,
	code: Number,
}

export type Ward = {
	name: String,
	code: Number,
}

export type MetaBaseMutation = {
	permissions: Array<any>,
}

export type MetaInstanceMutation = MetaBaseMutation & {
	permissionsInstance: Array<any>,
	modelService: BaseService,
	fieldsInput: Array<String>,
	fieldsReturn: Array<String>,
	idField: String,
}

export type MetaDeleteMutation = MetaBaseMutation & {
	modelService: BaseService,
	idField: String,
	permissionsInstance: Array<any>,
}

export type MetaBaseQuery = {
	permissions: Array<any>,
}

export type MetaInstanceQuery = MetaBaseQuery & {
	permissionsInstance: Array<any>,
	modelService: BaseService,
	fieldsReturn: Array<String>,
	idField: String,
}

export type MetaListQuery = MetaBaseQuery & {
	modelService: BaseService,
	fieldsReturn: Array<String>,
};

export type ResolverParams = {
	source: Object,
	args: Object,
	context: RequestContext,
	info: GraphQLResolveInfo
}