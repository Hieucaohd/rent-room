import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        allRooms(page: Int, limit: Int): RoomPaginator

        getRoomById(roomId: ID!): Room

        getListRoomByIds(listIds: [ID!]!, page: Int, limit: Int): RoomPaginator
    }

    extend type Mutation {
        createNewRoom(newRoom: RoomInput!, homeId: ID!): Room! @authRequire

        createNewRoomWithHome(newRoom: RoomInput!, newHome: HomeInput!): Room!

        updateRoom(updatedRoom: RoomUpdateInput!, id: ID!): Room! @authRequire

        deleteRoom(id: ID!): ID! @authRequire
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
    union GetRoomByIdResult = Room | InstanceNotExistError
`;
