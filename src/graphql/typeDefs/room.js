import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        allRooms(page: Int, limit: Int): RoomPaginator

        getRoomById(roomId: ID!): Room
    }

    extend type Mutation {
        createNewRoom(newRoom: RoomInput!, homeId: ID!): Room! @authRequire

        updateRoom(updatedRoom: RoomUpdateInput!, id: ID!): Room! @authRequire

        deleteRoom(id: ID!): ID! @authRequire
    }

    input RoomInput {
        price: Int
        square: Float
        isRented: Boolean
        floor: Int
        images: [String]
        description: String
        roomNumber: Int
        title: String
        amenities: [AmenitiesInput]
    }

    input RoomUpdateInput {
        price: Int
        square: Float
        isRented: Boolean
        floor: Int
        images: [String]
        description: String
        roomNumber: Int
        title: String
        amenities: [AmenitiesInput]
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
        amenities: [Amenities]

        createdAt: Date
        updatedAt: Date
    }

    type Amenities {
        title: String
        description: String
    }

    input AmenitiesInput {
        title: String
        description: String
    }

    type RoomPaginator implements PaginatorResult {
        docs: [Room]
        paginator: Paginator
    }
`;
