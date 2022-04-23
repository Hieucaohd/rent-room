import { readFile, writeFile } from 'promise-fs';
import path from 'path';
import _ from 'lodash';

/**
 * Compare two province, two district or two ward
 * the one have code bigger is bigger.
 * @param {int} a
 * @param {int} b
 * @returns {int} - if result < 0 then a < b, else result > 0 then a > 0, other result = 0 then a = b
 */
function compare(a, b) {
    return a.code - b.code;
}

/**
 * Get the list of provinces in vietnam with only two fields: name and code.
 * @param {array} addressData - array of provinces.
 * @returns {array} - array of provinces is sorted by code in ascending.
 */
function getProvinces(addressData) {
    let provinces = [];
    for (const province of addressData) {
        const provinceDataNeed = _.pick(province, ['name', 'code']);
        provinces.push(provinceDataNeed);
    }
    provinces.sort(compare);
    return provinces;
}

/**
 * Get the list of districts in vietnam with only two fields: name and code.
 * @param {array} addressData - array of provinces.
 * @returns {array} - array of districts is sorted by code in ascending.
 */
function getDistricts(addressData) {
    let districts = [];
    for (const province of addressData) {
        let districtsInProvince = [];
        for (const district of province.districts) {
            const districtDataNeeded = _.pick(district, ['name', 'code']);
            districtsInProvince.push(districtDataNeeded);
        }
        districts = districts.concat(districtsInProvince);
    }
    districts.sort(compare);
    return districts;
}

/**
 * Get the list of wards with only two fields: name and code.
 * @param {array} addressData - array of provinces.
 * @returns {array} - array of wards is sorted by code in ascending.
 */
function getWards(addressData) {
    let wards = [];
    for (const province of addressData) {
        for (const district of province.districts) {
            let wardsInDistrict = [];
            for (const ward of district.wards) {
                const wardDataNeeded = _.pick(ward, ['name', 'code']);
                wardsInDistrict.push(wardDataNeeded);
            }
            wards = wards.concat(wardsInDistrict);
        }
    }
    wards.sort(compare);
    return wards;
}

/**
 * Write data to file.
 * @param {string} pathToFile - path to file needed to write data to.
 * @param {any} data - data to write to file.
 */
function generateUnitAddressFile(pathToFile, data) {
    writeFile(pathToFile, JSON.stringify(data))
        .then((data) => {
            console.log(`Successfully write to file ${pathToFile}`);
        })
        .catch((err) => {
            console.error(`Error: ${err}`);
        });
}

async function main() {
    const pathToAddressFile = path.join(__dirname, '../src/address-json/address-in-vietnam.json');
    const addressData = JSON.parse(await readFile(pathToAddressFile));

    const provinces = getProvinces(addressData);
    const districts = getDistricts(addressData);
    const wards = getWards(addressData);

    generateUnitAddressFile(
        path.join(__dirname, '../src/address-json/provinces-in-vietnam.json'),
        provinces
    );
    generateUnitAddressFile(
        path.join(__dirname, '../src/address-json/districts-in-vietnam.json'),
        districts
    );
    generateUnitAddressFile(
        path.join(__dirname, '../src/address-json/wards-in-vietnam.json'),
        wards
    );
}

main();
