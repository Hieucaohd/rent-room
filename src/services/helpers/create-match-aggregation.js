import '../../common/types/typedef';

/**
 * @param {FilterRoomInput} conditions
 * @returns {Object}
 */
export const createMatchAggregation = (conditions) => {
    const DEFAULT_MIN = 0;
    const DEFAULT_MAX = 10**50;
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
                    $gte: price.scope.min || DEFAULT_MIN,
                    $lte: price.scope.max || DEFAULT_MAX,
                },
            }),
        ...(livingExpenses && {
            ...(livingExpenses.electricityCondition &&
                livingExpenses.electricityCondition.scope && {
                    'home.electricityPrice': {
                        $gte: livingExpenses.electricityCondition.scope.min || DEFAULT_MIN,
                        $lte: livingExpenses.electricityCondition.scope.max || DEFAULT_MAX,
                    },
                }),
            ...(livingExpenses.waterCondition &&
                livingExpenses.waterCondition.scope && {
                    'home.waterPrice': {
                        $gte: livingExpenses.waterCondition.scope.min || DEFAULT_MIN,
                        $lte: livingExpenses.waterCondition.scope.max || DEFAULT_MAX,
                    },
                }),
        }),
        ...(square &&
            square.scope && {
                square: {
                    $gte: square.scope.min || DEFAULT_MIN,
                    $lte: square.scope.max || DEFAULT_MAX,
                },
            }),
        ...(floor &&
            floor.scope && {
                floor: {
                    $gte: floor.scope.min || DEFAULT_MIN,
                    $lte: floor.scope.max || DEFAULT_MAX,
                },
            }),
        ...(liveWithOwner && { 'home.liveWithOwner': liveWithOwner }),
    };
};
