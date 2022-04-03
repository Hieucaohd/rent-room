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

    input HomeInput {
        province: Int
        district: Int
        ward: Int
        liveWithOwner: Boolean
        electricityPrice: Int
        waterPrice: Int
        images: [String]
        totalRooms: Int
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
        images: [String]
        totalRooms: Int
        listRooms(page: Int, limit: Int): RoomPaginator
            @getListRelate(field: "home", collection: "rooms")

        createdAt: String
        updatedAt: String
    }

    type HomePaginator implements PaginatorResult {
        docs: [Home]
        paginator: Paginator
    }
`;
