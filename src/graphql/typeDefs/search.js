import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        filterRoom(conditions: FilterRoomInput!, page: Int, limit: Int): RoomPaginator
    }


    input Scope {
        min: Float!
        max: Float!
    }

    input PriceConditionInput {
        arrange: ArrangeType
        scope: Scope
    }

    input SquareConditionInput {
        arrange: ArrangeType
        scope: Scope
    }

    input AddressConditionInput {
        province: Int
        district: Int
        ward: Int
    }

    input FloorConditionInput {
        scope: Scope
    }

    input ElectricityPriceConditionInput {
        arrange: ArrangeType
        scope: Scope
    }

    input WaterPriceConditionInput {
        arrange: ArrangeType
        scope: Scope
    }

    input InternetPriceConditionInput {
        arrange: ArrangeType
        scope: Scope
    }

    input CleaningPriceConditionInput {
        arrange: ArrangeType
        scope: Scope
    }

    input LivingExpensesConditionInput {
        electricityCondition: ElectricityPriceConditionInput
        waterCondition: WaterPriceConditionInput
        internetCondition: InternetPriceConditionInput
        cleaningCondition: CleaningPriceConditionInput
    }

    input FilterRoomInput {
        homeId: ID
        price: PriceConditionInput
        square: SquareConditionInput
        address: AddressConditionInput
        floor: FloorConditionInput
        liveWithOwner: Boolean
        livingExpenses: LivingExpensesConditionInput
        createdAt: ArrangeType
    }
`;
