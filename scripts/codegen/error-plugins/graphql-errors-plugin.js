import { oldVisit } from '@graphql-codegen/plugin-helpers';
import { parse, printSchema } from 'graphql';
import { errorsVisitor } from './error-visitor';
import { generateIsErrorFunction } from './generate-is-error-function';
import { generateTypeResolvers } from './generate-type-resolvers';

export const plugin = (schema, documents, config, info) => {
    const printedSchema = printSchema(schema);
    const astNode = parse(printedSchema);
    const result = oldVisit(astNode, {
        leave: errorsVisitor,
    });
    const defs = result.definitions
        .filter((d) => {
            return typeof d === 'string' && !!d;
        })
        .sort(sortDefs);

    // Ensure the ErrorResult base class is first
    function sortDefs(a, b) {
        if (typeof a === 'string' && a.includes('class ErrorResult')) {
            return -1;
        }
        return 1;
    }

    return {
        content: [
            ...defs,
            defs.length ? generateIsErrorFunction(schema) : '',
            generateTypeResolvers(schema),
        ].join('\n\n'),
    };
};
