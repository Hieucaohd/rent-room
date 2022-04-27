import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        allHomes(page: Int, limit: Int): HomePaginator

        getHomeById(homeId: ID!): Home
    }

    extend type Mutation {
        createNewHome(newHome: HomeInput!): Home @authRequire

        updateHome(updatedHome: HomeUpdateInput!, id: ID!): Home! @authRequire

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
        detailAddress: String
        description: String
        title: String
    }

    input HomeUpdateInput {
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
        detailAddress: String
        description: String
        title: String
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
        provinceName: String
        districtName: String
        wardName: String
        liveWithOwner: Boolean
        electricityPrice: Int
        waterPrice: Int
        internetPrice: Int
        cleaningPrice: Int
        images: [String]
        totalRooms: Int
        listRooms(page: Int, limit: Int): RoomPaginator

        position: Position
        description: String
        detailAddress: String
        title: String

        createdAt: Date
        updatedAt: Date
    }

    type HomePaginator implements PaginatorResult {
        docs: [Home]
        paginator: Paginator
    }
`;
