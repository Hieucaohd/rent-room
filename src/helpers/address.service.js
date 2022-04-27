import { readFileSync } from 'promise-fs';
import path from 'path';
import '../common/typedef';

/** 
 * @typedef {Array<Province>} Provinces
 * @typedef {Array<District>} Districts
 * @typedef {Array<Ward>} Wards
 */

const pathToProvincesFile = path.join(__dirname, '../address-json/provinces-in-vietnam.json');
const pathToDistrictsFile = path.join(__dirname, '../address-json/districts-in-vietnam.json');
const pathToWardsFile = path.join(__dirname, '../address-json/wards-in-vietnam.json');

/** @type {Provinces} */
const provinces = JSON.parse(readFileSync(pathToProvincesFile, 'utf8'));
/** @type {Districts} */
const districts = JSON.parse(readFileSync(pathToDistrictsFile, 'utf8'));
/** @type {Wards} */
const wards = JSON.parse(readFileSync(pathToWardsFile, 'utf8'));

/**
 * Get the name of province, district or ward.
 * @param {Number} code code of province | district | ward.
 * @param {Provinces | Districts | Wards} unit
 * @returns {String | null}
 */
function getAddressNameByCode(code, unit) {
    try {
        return unit.find((item) => item.code === code).name;
    } catch (err) {
        return null;
    }
}

/** 
 * @param {Number} provinceCode 
 * @returns {String | null}
 */
export function getProvinceNameByCode(provinceCode) {
	return getAddressNameByCode(provinceCode, provinces);
}

/**
 * @param {Number} districtCode 
 * @returns {String | null}
 */
export function getDistrictNameByCode(districtCode) {
	return getAddressNameByCode(districtCode, districts);
}

/**
 * @param {Number} wardCode 
 * @returns {String | null}
 */
export function getWardNameByCode(wardCode) {
	return getAddressNameByCode(wardCode, wards);
}