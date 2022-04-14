import { createMatchAggregation } from '../createMatchAggregation';

test('test create match aggregation', () => {
    const match = createMatchAggregation({ 
        address: { province: 1, ward: 3 }, 
        floor: 4,
        price: {
            scope: {min: 10000, max: 20000}
        },
        livingExpenses: {
            waterCondition: {
                scope: {min: 10000, max: 30000}
            }
        }
    });
    console.log(match);
});
