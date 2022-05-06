import { unwrapType, isInheritsFromErrorResult, isUnionOfResultAndErrors } from './utils';
import { Kind } from 'graphql';
import { ERROR_RESOLVER_NAME } from '../../../src/graphql/common/constant';

export function generateTypeResolvers(schema) {
    const mutations = getOperationsThatReturnErrorUnions(
        schema,
        schema.getMutationType().getFields()
    );
    const queries = getOperationsThatReturnErrorUnions(schema, schema.getQueryType().getFields());
    const operations = [...mutations, ...queries];
    let result = [`export const ${ERROR_RESOLVER_NAME} = {`];
    const typesHandled = new Set();
    for (const operation of operations) {
        const returnType = unwrapType(operation.type);
        if (!typesHandled.has(returnType.name)) {
            typesHandled.add(returnType.name);
            const nonErrorResult = returnType.getTypes().find((t) => !isInheritsFromErrorResult(t));
            result.push(
                `  ${returnType.name}: {`,
                `    __resolveType(obj) {`,
                `      return isGraphQLError(obj) ? obj.__typename : '${nonErrorResult.name}';`,
                `    },`,
                `  },`
            );
        }
    }
    result.push(`};`);
    result = result.join('\n');
    return result;
}

function getOperationsThatReturnErrorUnions(schema, fields) {
    return Object.values(fields).filter((operation) => {
        const innerType = unwrapType(operation.type);
        if (innerType.astNode && innerType.astNode.kind === Kind.UNION_TYPE_DEFINITION) {
            return isUnionOfResultAndErrors(schema, innerType.astNode);
        }
        return false;
    });
}
