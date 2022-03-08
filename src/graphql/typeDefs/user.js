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
    }

    type User {
        id: ID
        email: String
        fullname: String
        numberPhone: String
        province: Int
        district: Int
        ward: Int
        createdAt: String
        updatedAt: String
		avatar: String
    }

    type AuthResponse {
        user: User
        token: String
    }
`;
