import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        allRooms(paginatorOptions: PaginatorOptionsInput): RoomPaginator
        getRoomById(id: ID!): Room
    }

    extend type Mutation {
        createRoom(input: RoomCreateInput!): RoomCreateResult!
        updateRoom(input: RoomUpdateInput!): RoomUpdateResult!
        deleteRoom(id: ID!): RoomDeleteResult!
    }

    input RoomCreateInput {
        home: ID!
        price: Int
        square: Float
        isRented: Boolean
        floor: Int
        images: [String]
        description: String
        roomNumber: Int
        title: String
        amenities: [Int]
    }

    input RoomUpdateInput {
        id: ID!
        price: Int
        square: Float
        isRented: Boolean
        floor: Int
        images: [String]
        description: String
        roomNumber: Int
        title: String
        amenities: [Int]
    }

    type Room implements Node & Timestamps {
        _id: ID

        home: Home

        price: Int
        square: Float
        isRented: Boolean
        floor: Int
        images: [String]
        description: String
        roomNumber: Int
        title: String
        amenities: [Int]

        createdAt: Date
        updatedAt: Date
    }

    type RoomPaginator implements PaginatorResult {
        docs: [Room]
        paginator: Paginator
    }

    union RoomCreateResult = Room | PermissionDeninedError
    union RoomUpdateResult = Room | InstanceNotExistError | PermissionDeninedError
    union RoomDeleteResult = AfterDelete | InstanceNotExistError | PermissionDeninedError
`;
