import { createSearchOptions } from "../helpers/paginator.service";
import { createMatchAggregation } from "../helpers/create-match-aggregation";
import { Room } from "../../models";

/**
 * @param {FilterRoomInput} conditions 
 * @param {Number} page 
 * @param {Number} limit 
 * @returns {Promise<RoomPaginator>}
 */
export const filterRoom = async (conditions, page, limit) => {
    const match = createMatchAggregation(conditions);

    const myAggregate = Room.aggregate([
        {
            $lookup: {
                from: 'homes',
                localField: 'home',
                foreignField: '_id',
                as: 'home',
            },
        },
        {
            $unwind: '$home',
        },
        {
            $match: match,
        },
    ]);
    const options = createSearchOptions(conditions, page, limit);
    return await Room.aggregatePaginate(myAggregate, options);
};