import { generate } from '@graphql-codegen/cli';
import { downloadIntrospectionSchema } from './download-introspection-schema';
import path from 'path';

const API_PATH = 'graphql';
const OUTPUT_FILE_SCHEMA = path.join(__dirname, '../../schema.json');

downloadIntrospectionSchema(API_PATH, OUTPUT_FILE_SCHEMA)
    .then((success) => {
        if (!success) {
            console.log(`Attempting to generates type from ${OUTPUT_FILE_SCHEMA}`);
        }

        const config = {
            namingConvention: {
                enumValue: 'keep',
            },
            strict: true,
            scalar: {
                ID: 'string | number',
            },
            maybeValue: 'T',
        };

        const disableTsLinkPlugin = {
            add: {
                content: '// tslint:disable',
            },
        };

        const commonPlugin = [disableTsLinkPlugin, 'typescript'];

        return generate({
            overwrite: true,
            generates: {
                [path.join(__dirname, '../../src/common/types/graphql-types.ts')]: {
                    schema: [OUTPUT_FILE_SCHEMA],
                    plugins: commonPlugin,
                    config: config,
                },
            },
        });
    })
    .then(
        (result) => {
            process.exit(0);
        },
        (err) => {
            console.error(err);
            process.exit(1);
        }
    );
