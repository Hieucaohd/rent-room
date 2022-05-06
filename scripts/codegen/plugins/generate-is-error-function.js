import { isObjectTypeDefinition, isInheritsFromErrorResult } from './utils';
import { ERROR_INTERFACE_NAME } from './constant';

export function generateIsErrorFunction(schema) {
    const errorNodes = Object.values(schema.getTypeMap())
        .map((type) => type.astNode)
        .filter(isObjectTypeDefinition)
        .filter((node) => isInheritsFromErrorResult(node));
    return `
const errorTypeNames = new Set([${errorNodes.map((n) => `'${n.name.value}'`).join(', ')}]);
function isGraphQLError(input) {
  return input instanceof ${ERROR_INTERFACE_NAME} || errorTypeNames.has(input.__typename);
}`;
}
