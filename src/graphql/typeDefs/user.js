import { gql } from "apollo-server-express";

export default gql`
    extend type Mutation {
        register(newUser: UserInput!): AuthResponse!
        logout: LogoutStatus!
    }

    extend type Query {
        login(email: String!, password: String!): AuthResponse!
        profile: Profile
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

    type User implements Node & Timestamps {
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
    }

    enum Role {
        ADMIN
        VIEWER
    }

    enum UserType {
        TENANT
        HOST
    }

    type Profile {
        user: User
        isAuth: Boolean
    }

    type LogoutStatus {
        status: Boolean!
    }
`;
