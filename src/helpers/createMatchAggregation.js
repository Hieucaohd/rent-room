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
                    $gte: price.scope.min,
                    $lte: price.scope.max,
                },
            }),
        ...(livingExpenses && {
            ...(livingExpenses.electricityCondition &&
                livingExpenses.electricityCondition.scope && {
                    'home.electricityPrice': {
                        $gte: livingExpenses.electricityCondition.scope.min,
                        $lte: livingExpenses.electricityCondition.scope.max,
                    },
                }),
            ...(livingExpenses.waterCondition &&
                livingExpenses.waterCondition.scope && {
                    'home.waterPrice': {
                        $gte: livingExpenses.waterCondition.scope.min,
                        $lte: livingExpenses.waterCondition.scope.max,
                    },
                }),
        }),
        ...(square &&
            square.scope && {
                square: {
                    $gte: square.scope.min,
                    $lte: square.scope.max,
                },
            }),
        ...(floor &&
            floor.scope && {
                floor: {
                    $gte: floor.scope.min,
                    $lte: floor.scope.max,
                },
            }),
        ...(liveWithOwner && { 'home.liveWithOwner': liveWithOwner }),
    };
};
