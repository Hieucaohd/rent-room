import { readFileSync } from 'promise-fs';
import path from 'path';
import '../../common/types/typedef';

/**
 * @typedef {Array<ProvinceName>} ProvinceNames
 * @typedef {Array<DistrictName>} DistrictNames
 * @typedef {Array<WardName>} WardNames
 *
 * @typedef {Array<Province>} Provinces
 * @typedef {Array<District>} Districts
 * @typedef {Array<Ward>} Wards
 */

const pathToProvincesFile = path.join(__dirname, '../../../address-json/provinces-in-vietnam.json');
const pathToDistrictsFile = path.join(__dirname, '../../../address-json/districts-in-vietnam.json');
const pathToWardsFile = path.join(__dirname, '../../../address-json/wards-in-vietnam.json');

/** @type {ProvinceNames} */
const provinceNames = JSON.parse(readFileSync(pathToProvincesFile, 'utf8'));
/** @type {DistrictNames} */
const districtNames = JSON.parse(readFileSync(pathToDistrictsFile, 'utf8'));
/** @type {WardNames} */
const wardNames = JSON.parse(readFileSync(pathToWardsFile, 'utf8'));

const pathToAddressFile = path.join(__dirname, '../../../address-json/address-in-vietnam.json');

/** @type {Provinces} */
const provinces = JSON.parse(readFileSync(pathToAddressFile, 'utf8'));

/**
 * Get the name of province, district or ward.
 * @param {Number} code code of province | district | ward.
 * @param {ProvinceNames | DistrictNames | WardNames} unit
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
    return getAddressNameByCode(provinceCode, provinceNames);
}

/**
 * @param {Number} districtCode
 * @returns {String | null}
 */
export function getDistrictNameByCode(districtCode) {
    return getAddressNameByCode(districtCode, districtNames);
}

/**
 * @param {Number} wardCode
 * @returns {String | null}
 */
export function getWardNameByCode(wardCode) {
    return getAddressNameByCode(wardCode, wardNames);
}

/**
 *
 * @returns {Provinces}
 */
export function getProvinceList() {
    const listProvinces = provinces;

    return listProvinces;
}

/**
 *
 * @param {String | Number} code
 * @returns {Province}
 */
export function getProvince(code) {
    if (typeof code === 'string') {
        code = Number(code);
    }
    const listProvinces = getProvinceList();
    const province = listProvinces.filter((p) => p.code === code);
    return province.length > 0 ? province[0] : Object();
}

/**
 *
 * @param {String | Number} provinceCode
 * @returns {Districts}
 */
export function getDistrictList(provinceCode = null) {
    if (typeof provinceCode === 'string') {
        provinceCode = Number(provinceCode);
    }

    let listProvinces = getProvinceList();

    if (provinceCode) {
        listProvinces = listProvinces.filter((p) => p.code === provinceCode);
    }
    const listDistricts = listProvinces.map((p, i) => p.districts).flat(1);

    return listDistricts;
}

/**
 *
 * @param {String | Number} code
 * @returns {District}
 */
export function getDistrict(code) {
    if (typeof code === 'string') {
        code = Number(code);
    }
    const listDistricts = getDistrictList();
    const district = listDistricts.filter((d) => d.code === code);
    return district.length > 0 ? district[0] : Object();
}

/**
 *
 * @param {String | Number} districtCode
 * @returns {Wards}
 */
export function getWardList(districtCode = null) {
    if (typeof districtCode === 'string') {
        districtCode = Number(districtCode);
    }

    let listDistricts = getDistrictList();

    if (districtCode) {
        listDistricts = listDistricts.filter((d) => d.code === districtCode);
    }

    const listWards = listDistricts.map((d) => d.wards).flat(1);

    return listWards;
}

/**
 *
 * @param {String | Number} code
 * @returns {Ward}
 */
export function getWard(code) {
    if (typeof code === 'string') {
        code = Number(code);
    }
    const listWards = getWardList();
    const ward = listWards.filter((w) => w.code === code);
    return ward.length > 0 ? ward[0] : Object();
}
