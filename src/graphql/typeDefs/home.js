import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        allHomes: [Home]
    }

    extend type Mutation {
        createNewHome(newHome: HomeInput): Home
    }

    input HomeInput {
        province: Int
        district: Int
        ward: Int
        liveWithOwner: Boolean
        electricityPrice: Int
        waterPrice: Int
    }

    type Home {
        id: ID!
        owner: User
        province: Int
        district: Int
        ward: Int
        liveWithOwner: Boolean
        electricityPrice: Int
        waterPrice: Int
        createdAt: String
        updatedAt: String
    }
`;
