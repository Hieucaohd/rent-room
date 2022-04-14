export const createOptions = (page, limit) => {
    const customLabels = {
        meta: 'paginator',
    };

    return {
        page: page || 1,
        limit: limit || 10,
        customLabels,
    };
};

export const createSearchOptions = (conditions, page, limit) => {
    const customLabels = {
        meta: 'paginator',
    };
    const {price, square, livingExpenses} = conditions;
    return {
        page: page || 1,
        limit: limit || 10,
        sort: {
            ...price && price.arrange && {price: price.arrange === 'ASC' ? 1 : -1},
            ...livingExpenses && {
                ...livingExpenses.electricityCondition && livingExpenses.electricityCondition.arrange && {'home.electricityPrice': livingExpenses.electricityCondition.arrange === 'ASC' ? 1 : -1},
                ...livingExpenses.waterCondition && livingExpenses.waterCondition.arrange && {'home.electricityPrice': livingExpenses.waterCondition.arrange === 'ASC' ? 1 : -1},
            },
            ...square && square.arrange && {square: square.arrange === 'ASC' ? 1 : -1}, 
            createAt: -1,
        },
        customLabels,
    };
};
