import { gql } from "apollo-server-express";

export default gql`
    extend type Mutation {
        updateUser(input: UserUpdateInput!): UserUpdateResult!
    }

    input UserUpdateInput {
        fullname: String
        numberPhone: String
        province: Int
        district: Int
        ward: Int
        avatar: String
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
        userType: String
        role: [String]

        listHomes(paginatorOptions: PaginatorOptionsInput): HomePaginator

        createdAt: Date
        updatedAt: Date
    }

    enum Role {
        ADMIN
        VIEWER
    }

    enum UserType {
        TENANT
        HOST
    }

    union UserUpdateResult = User | InstanceNotExistError | PermissionDeninedError
`;
