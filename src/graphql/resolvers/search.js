import { filterRoom } from "../../services/search";

export default {
    Query: {
        filterRoom: async (_, { conditions, page, limit }, { user }) => {
            return await filterRoom(conditions, page, limit)
        },
    },
};
