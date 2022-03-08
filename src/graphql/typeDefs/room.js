import { gql } from "apollo-server-express";

export default gql`
    input RoomInput {
        price: Int
        square: Float
        isRented: Boolean
        floor: Int
    }

    type Room {
        id: ID
        home: Home
        price: Int
        square: Float
        isRented: Boolean
        floor: Int
    }
`;
