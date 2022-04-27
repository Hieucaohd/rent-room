import { filterRoom } from "../../services/search.service";

export default {
    Query: {
        filterRoom: async (_, { conditions, page, limit }, { user }) => {
            return await filterRoom(conditions, page, limit)
        },
    },
};
