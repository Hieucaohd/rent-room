import '../../common/types/typedef';

/**
 * @param {FilterRoomInput} conditions
 * @returns {Object}
 */
export const createMatchAggregation = (conditions) => {
    const { price, square, address, floor, liveWithOwner, livingExpenses } = conditions;
    return {
        ...(address && {
            ...(address.province && { 'home.province': address.province }),
            ...(address.district && { 'home.district': address.district }),
            ...(address.ward && { 'home.ward': address.ward }),
        }),
        ...(price &&
            price.scope && {
                price: {
                    ...price.scope.min && {$gte: price.scope.min},
                    ...price.scope.max && {$lte: price.scope.max},
                },
            }),
        ...(livingExpenses && {
            ...(livingExpenses.electricityCondition &&
                livingExpenses.electricityCondition.scope && {
                    'home.electricityPrice': {
                        ...livingExpenses.electricityCondition.scope.min && {$gte: livingExpenses.electricityCondition.scope.min},
                        ...livingExpenses.electricityCondition.scope.max && {$lte: livingExpenses.electricityCondition.scope.max},
                    },
                }),
            ...(livingExpenses.waterCondition &&
                livingExpenses.waterCondition.scope && {
                    'home.waterPrice': {
                        ...livingExpenses.waterCondition.scope.min && {$gte: livingExpenses.waterCondition.scope.min},
                        ...livingExpenses.waterCondition.scope.max && {$lte: livingExpenses.waterCondition.scope.max},
                    },
                }),
        }),
        ...(square &&
            square.scope && {
                square: {
                    ...square.scope.min && {$gte: square.scope.min},
                    ...square.scope.max && {$lte: square.scope.max},
                },
            }),
        ...(floor &&
            floor.scope && {
                floor: {
                    ...floor.scope.min && {$gte: floor.scope.min},
                    ...floor.scope.max && {$lte: floor.scope.max},
                },
            }),
        ...(liveWithOwner && { 'home.liveWithOwner': liveWithOwner }),
    };
};
