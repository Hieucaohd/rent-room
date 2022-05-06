import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        allHomes(paginatorOptions: PaginatorOptionsInput): HomePaginator
        getHomeById(id: ID!): Home
    }

    extend type Mutation {
        createHome(input: HomeCreateInput!): HomeCreateResult!
        updateHome(input: HomeUpdateInput!): HomeUpdateResult!
        deleteHome(id: ID!): HomeDeleteResult!
    }

    input PositionInput {
        x: Float!
        y: Float!
        lng: Float
        lat: Float
    }

    input HomeCreateInput {
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
        minPrice: Int
        maxPrice: Int
    }

    input HomeUpdateInput {
        id: ID!
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
        minPrice: Int
        maxPrice: Int
    }

    type Position {
        x: Float
        y: Float
        lng: Float
        lat: Float
    }

    type Home implements Node & Timestamps {
        _id: ID

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
        listRooms(paginatorOptions: PaginatorOptionsInput): RoomPaginator

        position: Position
        description: String
        detailAddress: String
        title: String
        minPrice: Int
        maxPrice: Int

        createdAt: Date
        updatedAt: Date
    }

    type HomePaginator implements PaginatorResult {
        docs: [Home]
        paginator: Paginator
    }

    union HomeCreateResult = Home | PermissionDeninedError
    union HomeUpdateResult = Home | InstanceNotExistError | PermissionDeninedError
    union HomeDeleteResult = AfterDelete | InstanceNotExistError | PermissionDeninedError
`;
