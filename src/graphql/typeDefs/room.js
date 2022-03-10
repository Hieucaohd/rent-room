import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        allRooms(page: Int, limit: Int): RoomPaginator
    }

    extend type Mutation {
        createNewRoom(newRoom: RoomInput!, home_id: ID!): Room @authRequire
    }

    input RoomInput {
        price: Int
        square: Float
        isRented: Boolean
        floor: Int
        images: [String]
    }

    type Room implements Timestamps {
        _id: ID

        home: Home

        price: Int
        square: Float
        isRented: Boolean
        floor: Int
        images: [String]

        createdAt: String
        updatedAt: String
    }

    type RoomPaginator implements PaginatorResult{
        docs: [Room]
        paginator: Paginator
    }
`;
