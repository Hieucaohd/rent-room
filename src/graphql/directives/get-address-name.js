import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';
import { readFileSync } from 'promise-fs';
import path from 'path';

const pathToProvincesFile = path.join(__dirname, '../../address-json/provinces-in-vietnam.json');
const pathToDistrictsFile = path.join(__dirname, '../../address-json/districts-in-vietnam.json');
const pathToWardsFile = path.join(__dirname, '../../address-json/wards-in-vietnam.json');

const provinces = JSON.parse(readFileSync(pathToProvincesFile, 'utf8'));
const districts = JSON.parse(readFileSync(pathToDistrictsFile, 'utf8'));
const wards = JSON.parse(readFileSync(pathToWardsFile, 'utf8'));

/**
 * Get the name of province, district or ward.
 * @param {int} code - code of province | district | ward.
 * @param {array} unit - {@link provinces} | {@link districts} | {@link wards}.
 * @returns {string | null}
 */
function getAddressNameByCode(code, unit) {
    try {
        return unit[code - 1].name;
    } catch (err) {
        return null;
    }
}

// Directive that require authentication before make resolve
export const getAddressNameDirectiveTransformer = (schema, directiveName) => {
    return mapSchema(schema, {
        [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
            let getAddressNameDirective = getDirective(schema, fieldConfig, directiveName);

            if (getAddressNameDirective) {
                getAddressNameDirective = getAddressNameDirective[0];

                if (getAddressNameDirective) {
                    const { resolve = defaultFieldResolver } = fieldConfig;

                    fieldConfig.resolve = async function (source, args, context, info) {
                        const field = getAddressNameDirective['field'];
                        switch (field) {
                            case 'province':
                                return getAddressNameByCode(source.province, provinces);
                                break;
                            case 'district':
                                return getAddressNameByCode(source.district, districts);
                                break;
                            case 'ward':
                                return getAddressNameByCode(source.ward, wards);
                                break;
                            default:
                                return null;
                                break;
                        }
                    };

                    return fieldConfig;
                }
            }
        },
    });
};
