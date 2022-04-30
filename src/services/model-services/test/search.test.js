const mongoose = require('mongoose');
import { DB_DOCKER } from '../../config';
import { createOptions } from '../../helpers';
import { Room } from '../../models';

describe('Filter room', () => {
    beforeAll(async () => {
        await mongoose.connect(DB_DOCKER, { useNewUrlParser: true });
    });

    it('should return list of rooms', async () => {
        const rooms = await Room.find({});
        expect(Array.isArray(rooms)).toBeTruthy();
    });

    it('should return list of rooms with province is 1 and district is 1', async () => {
        const myAggregate = Room.aggregate([
            {
                $lookup: {
                    from: 'homes',
                    localField: 'home',
                    foreignField: '_id',
                    as: 'home',
                },
            },
            {
                $unwind: '$home',
            },
            {
                $match: { 'home.province': 1, 'home.district': 1 },
            },
        ]);
        let options = createOptions(1, 10);
        options.sort = {
            createdAt: -1,
        };
        const rooms = await Room.aggregatePaginate(myAggregate, options);
        rooms?.docs.forEach(({ home }) => {
            expect(home?.province).toBe(1);
            expect(home?.district).toBe(1);
        });
    });

    it('should return list of rooms with price greater than or equal 1 million less than or equal 3 million', async () => {
        const myAggregate = Room.aggregate([
            {
                $lookup: {
                    from: 'homes',
                    localField: 'home',
                    foreignField: '_id',
                    as: 'home',
                },
            },
            {
                $unwind: '$home',
            },
            {
                $match: { price: {$gte: 1000000, $lte: 3000000} },
            },
        ]);
        let options = createOptions(1, 10);
        options.sort = {
            price: 1,
        };
        const rooms = await Room.aggregatePaginate(myAggregate, options);
        rooms?.docs.forEach(({ price }) => {
            expect(price).toBeGreaterThanOrEqual(1000000);
            expect(price).toBeLessThanOrEqual(3000000);
        });
    });

    it('should return list of rooms with water price less than or equal 30000 and electricity price less than or equal 10000', async () => {
        const myAggregate = Room.aggregate([
            {
                $lookup: {
                    from: 'homes',
                    localField: 'home',
                    foreignField: '_id',
                    as: 'home',
                },
            },
            {
                $unwind: '$home',
            },
            {
                $match: { 'home.waterPrice': {$lte: 30000}, 'home.electricityPrice': {$lte: 10000} },
            },
        ]);
        let options = createOptions(1, 10);
        options.sort = {
            'home.waterPrice': -1,
        };
        const rooms = await Room.aggregatePaginate(myAggregate, options);
        rooms?.docs.forEach(({ home }) => {
            expect(home?.waterPrice).toBeLessThanOrEqual(30000);
            expect(home?.electricityPrice).toBeLessThanOrEqual(10000);
        });
    });
});
