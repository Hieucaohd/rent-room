import { createSearchOptions } from "../helpers";
import { createMatchAggregation } from "../helpers/createMatchAggregation";
import { Room } from "../models";

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