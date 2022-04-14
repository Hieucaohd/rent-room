export const createMatchAggregation = (conditions) => {
    const { price, square, address, floor, liveWithOwner, livingExpenses } = conditions;
    return {
        ...(address && {
            ...(address.province && { 'home.province': address.province }),
            ...(address.district && { 'home.district': address.district }),
            ...(address.ward && { 'home.ward': address.ward }),
        }),
        ...(price && price.scope && {
            price: {
                ...(price.scope.min && { $gte: price.scope.min }),
                ...(price.scope.min && { $lte: price.scope.max }),
            },
        }),
        ...(livingExpenses && {
            ...(livingExpenses.electricityCondition && livingExpenses.electricityCondition.scope && {
                'home.electricityPrice': {
                    ...(livingExpenses.electricityCondition.scope.min && {
                        $gte: livingExpenses.electricityCondition.scope.min,
                    }),
                    ...(livingExpenses.electricityCondition.scope.min && {
                        $lte: livingExpenses.electricityCondition.scope.max,
                    }),
                },
            }),
            ...(livingExpenses.waterCondition && livingExpenses.waterCondition.scope && {
                'home.waterPrice': {
                    ...(livingExpenses.waterCondition.scope.min && {
                        $gte: livingExpenses.waterCondition.scope.min,
                    }),
                    ...(livingExpenses.waterCondition.scope.min && {
                        $lte: livingExpenses.waterCondition.scope.max,
                    }),
                },
            }),
        }),
        ...(square && square.scope && {
            square: {
                ...(square.scope.min && { $gte: square.scope.min }),
                ...(square.scope.min && { $lte: square.scope.max }),
            },
        }),
        ...(floor && floor.scope && {
            floor: {
                ...(floor.scope.min && { $gte: floor.scope.min }),
                ...(floor.scope.min && { $lte: floor.scope.max }),
            },
        }),
        ...(liveWithOwner && { 'home.liveWithOwner': liveWithOwner }),
    };
};
