import { Kind } from 'graphql';
import { isScalar, camelToUpperSnakeCase, isInheritsFromErrorResult } from './utils';
import { ERROR_INTERFACE_NAME } from '../../../src/graphql/common/constant';

const empty = () => '';

export const errorsVisitor = {
    [Kind.NON_NULL_TYPE]: (node) => {
        return node.type.kind === Kind.NAMED_TYPE
            ? node.type.name.value
            : node.type.kind === Kind.LIST_TYPE
            ? node.type
            : '';
    },
    [Kind.FIELD_DEFINITION]: (node) => {
        // const type = node.type.kind === Kind.LIST_TYPE ? node.type.type : node.type;
        // const tsType = isScalar(type) ? `Scalars['${type}']` : 'any';
        // const listPart = node.type.kind === Kind.LIST_TYPE ? `[]` : ``;
        // return `${node.name.value}: ${tsType}${listPart}`;
        return `${node.name.value}`;
    },
    [Kind.SCALAR_TYPE_DEFINITION]: empty,
    [Kind.INPUT_OBJECT_TYPE_DEFINITION]: empty,
    [Kind.ENUM_TYPE_DEFINITION]: empty,
    [Kind.UNION_TYPE_DEFINITION]: empty,
    [Kind.INTERFACE_TYPE_DEFINITION]: (node) => {
        if (node.name.value !== ERROR_INTERFACE_NAME) {
            return '';
        }
        return [
            `export class ${ERROR_INTERFACE_NAME} {`,
            `  __typename`,
            `  errorCode`,
            ...node.fields.filter((f) => !f.includes('errorCode')).map((f) => `  ${f};`),
            `}`,
        ].join('\n');
    },

    [Kind.OBJECT_TYPE_DEFINITION]: (node, key, parent) => {
        if (!isInheritsFromErrorResult(node)) {
            return '';
        }

        return [
            `export class ${node.name.value} extends ${ERROR_INTERFACE_NAME} {`,
            `  __typename = '${node.name.value}';`,
            `  errorCode = '${camelToUpperSnakeCase(node.name.value)}';`,
            `  message = '${camelToUpperSnakeCase(node.name.value)}';`,
            `  constructor(`,
            ...node.fields
                .filter((f) => !f.includes('errorCode') && !f.includes('message'))
                .map((f) => `   ${f},`),
            `  ) {`,
            `    super();`,
            `  }`,
            `}`,
        ].join('\n');
    },
};
