import { buildSchema, extendSchema, GraphQLSchema, parse, Kind } from 'graphql';
import { ERROR_INTERFACE_NAME } from '../../../scripts/codegen/plugins/constant.js';
import { camelToUpperSnakeCase } from '../../../scripts/codegen/plugins/utils.js';

/**
 * Generates the members of the `ErrorCode` enum dynamically, by getting the names of
 * all the types which inherit from the `ErrorResult` interface.
 * 
 * @param {GraphQLSchema} typeDefsOrSchema
 * @returns {GraphQLSchema}
 */
export function generateErrorCodeEnum(typeDefsOrSchema) {
    const schema = typeof typeDefsOrSchema === 'string' ? buildSchema(typeDefsOrSchema) : typeDefsOrSchema;
    const errorNodes = Object.values(schema.getTypeMap())
        .map(type => type.astNode)
        .filter(node => {
            return (
                node &&
                node.kind === Kind.OBJECT_TYPE_DEFINITION &&
                node.interfaces.map(i => i.name.value).includes(ERROR_INTERFACE_NAME)
            );
        });
    if (!errorNodes.length) {
        return schema;
    }

    const errorCodeEnum = `
        extend enum ErrorCode {
            ${errorNodes.map(n => camelToUpperSnakeCase(n.name.value || '')).join('\n')}
        }`;
    return extendSchema(schema, parse(errorCodeEnum));
}
