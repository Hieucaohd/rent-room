import { gql } from "apollo-server-express";

export default gql`
    extend type Mutation {
        updateUser(updateInfo: UserUpdateInput!): User! @authRequire
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
        userType: [UserType]
    }

    input UserUpdateInput {
        fullname: String
        numberPhone: String
        province: Int
        district: Int
        ward: Int
        avatar: String
        userType: [UserType]
    }

    type User implements Node & Timestamps {
        _id: ID

        email: String
        fullname: String
        numberPhone: String
        province: Int
        district: Int
        ward: Int
        provinceName: String
        districtName: String
        wardName: String
        avatar: String
        defaultHome: Home
        userType: [UserType]
        role: [String]

        listHomes(page: Int, limit: Int): HomePaginator

        createdAt: Date
        updatedAt: Date
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
