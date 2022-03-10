export const createOptions = (page, limit) => {
    const customLabels = {
        meta: "paginator",
    };

    return {
        page: page || 1,
        limit: limit || 10,
        customLabels,
    };
};
