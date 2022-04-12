import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        allHomes(page: Int, limit: Int): HomePaginator

        getHomeById(homeId: ID!): Home
    }

    extend type Mutation {
        createNewHome(newHome: HomeInput!): Home @authRequire

        updateHome(updatedHome: HomeInput!, id: ID!): Home! @authRequire

        deleteHome(id: ID!): ID! @authRequire
    }

    input PositionInput {
        x: Float!
        y: Float!
        lng: Float
        lat: Float
    }

    input HomeInput {
        province: Int
        district: Int
        ward: Int
        liveWithOwner: Boolean
        electricityPrice: Int
        waterPrice: Int
        internetPrice: Int
        cleaningPrice: Int
        images: [String]
        totalRooms: Int
        position: PositionInput
        description: String
    }

    type Position {
        x: Float
        y: Float
        lng: Float
        lat: Float
    }

    type Home implements Node & Timestamps {
        _id: ID!

        owner: User
        province: Int
        district: Int
        ward: Int
        liveWithOwner: Boolean
        electricityPrice: Int
        waterPrice: Int
        internetPrice: Int
        cleaningPrice: Int
        images: [String]
        totalRooms: Int @countRoom
        listRooms(page: Int, limit: Int): RoomPaginator
            @getListRelate(field: "home", collection: "rooms")
        
        position: Position
        description: String

        createdAt: String
        updatedAt: String
    }

    type HomePaginator implements PaginatorResult {
        docs: [Home]
        paginator: Paginator
    }
`;
