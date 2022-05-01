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
	modelService: BaseService,
	permissionsInstance: Array<any>,
	fieldsInput: Array<String>,
	fieldsReturn: Array<String>,
	idField: String,
}

export type MetaDeleteMutation = MetaBaseMutation & {
	modelService: BaseService,
	permissionsInstance: Array<any>,
	idField: String,
}

export type MetaBaseQuery = {
	permissions: Array<any>,
}

export type MetaInstanceQuery = MetaBaseQuery & {
	modelService: BaseService,
	permissionsInstance: Array<any>,
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