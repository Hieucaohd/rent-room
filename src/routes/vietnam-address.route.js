import express from 'express';

import {
    getProvince,
    getProvinceList,
    getDistrict,
    getDistrictList,
    getWard,
    getWardList,
} from '../services/helpers/address.service';

const router = express.Router();

router.get(['/', '/provinces'], async (req, res) => {
    try {
        const provinces = getProvinceList();
        res.json( provinces );
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get('/districts', async (req, res) => {
    try {
        const districts = getDistrictList();
        res.json( districts );
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get('/districts/:province_code', async (req, res) => {
    try {
        const provinceCode = req.params.province_code;
        const districts = getDistrictList(provinceCode);
        res.json( districts );
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get('/wards', async (req, res) => {
    try {
        const wards = getWardList();
        res.json( wards );
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get('/wards/:district_code', async (req, res) => {
    try {
        const districtCode = req.params.district_code;
        const wards = getWardList(districtCode);
        res.json( wards );
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get('/province/:province_code', async (req, res) => {
    try {
        const provinceCode = req.params.province_code;
        const province = getProvince(provinceCode);
        res.json( province );
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get('/district/:district_code', async (req, res) => {
    try {
        const districtCode = req.params.district_code;
        const district = getDistrict(districtCode);
        res.json( district );
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

router.get('/ward/:ward_code', async (req, res) => {
    try {
        const wardCode = req.params.ward_code;
        const ward = getWard(wardCode);
        res.json( ward );
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

export default router;
