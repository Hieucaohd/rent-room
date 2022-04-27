import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation {
        register(newUser: UserInput!): AuthResponse!
        logout: LogoutStatus! @authRequire
    }

	extend type Query {
        login(email: String!, password: String!): AuthResponse!
        profile: Profile @authRequire
	}	
`;
