import { gql } from "apollo-server-express";

export default gql`
    extend type Mutation {
        register(newUser: UserInput!): AuthResponse!
    }

    extend type Query {
        login(email: String!, password: String!): AuthResponse!
    }

    input UserInput {
        email: String!
        password: String!
        fullname: String!
        numberPhone: String
        province: Int
        district: Int
        ward: Int
        avatar: String
        userType: UserType
    }

    type User implements Timestamps {
        _id: ID

        email: String
        fullname: String
        numberPhone: String
        province: Int
        district: Int
        ward: Int
        avatar: String
        defaultHome: Home
        userType: String
        role: [String]

        createdAt: String
        updatedAt: String
    }

    type AuthResponse {
        user: User
        token: String
    }

    enum Role {
        ADMIN
        VIEWER
    }

    enum UserType {
        TENANT
        HOST
    }
`;
