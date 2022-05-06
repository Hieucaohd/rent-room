import { buildScalars } from '@graphql-codegen/visitor-plugin-common';
import { isNamedType, isObjectType, Kind } from 'graphql';
import { ERROR_INTERFACE_NAME } from './constant';

export function isScalar(type) {
    return ['ID', 'String', 'Boolean', 'Int', 'Float', 'JSON', 'DateTime', 'Upload'].includes(type);
}

export function isObjectTypeDefinition(node) {
    return node && node && node.kind === Kind.OBJECT_TYPE_DEFINITION;
}

/**
 * Unwraps the inner type from a higher-order type, e.g. [Home!]! => Home
 */
export function unwrapType(type) {
    if (isNamedType(type)) {
        return type;
    }
    let innerType = type;
    while (!isNamedType(innerType)) {
        innerType = innerType.ofType;
    }
    return innerType;
}

export function isUnionOfResultAndErrors(schema, node) {
    const errorResultTypes = node.types.filter((namedType) => {
        const type = schema.getType(namedType.name.value);
        if (isObjectType(type)) {
            if (isInheritsFromErrorResult(type)) {
                return true;
            }
        }
        return false;
    });
    return (errorResultTypes.length = node.types.length - 1);
}

export function isInheritsFromErrorResult(node) {
    const interfaceNames = isObjectType(node)
        ? node.getInterfaces().map((i) => i.name)
        : node.interfaces.map((i) => i.name.value);
    return interfaceNames.includes(ERROR_INTERFACE_NAME);
}

export function camelToUpperSnakeCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase();
}

export function generateScalars(schema, config) {
    const scalarMap = buildScalars(schema, config.scalars);
    const allScalars = Object.keys(scalarMap)
        .map((scalarName) => {
            const scalarValue = scalarMap[scalarName].type;
            const scalarType = schema.getType(scalarName);

            return `  ${scalarName}: ${scalarValue},`;
        })
        .join('\n');
    return `export const Scalars = {\n${allScalars}\n};`;
}
