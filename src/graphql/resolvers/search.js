export default {
    Query: {
        filterRoom: async (_, { conditions, page, limit }, { user }) => {
            const {
                homeId,
                price,
                square,
                address,
                floor,
                liveWithOwner,
                livingExpenses,
            } = conditions;

            let homeQuery = {};

            if (homeId) {
                homeQuery["_id"] = homeId;
            }

            if (liveWithOwner) {
                homeQuery["liveWithOwner"] = liveWithOwner;
            }

            if (livingExpenses) {
                const {
                    electricityCondition,
                    waterCondition,
                    internetCondition,
                    cleaningCondition,
                } = livingExpenses;
            }
            return null;
        },
    },
};
