import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation {
        register(input: UserCreateInput!): NativeRegisterResponse!
        logout: LogoutResponse!
    }

	extend type Query {
        login(email: String!, password: String!): NativeAuthResponse!
        profile: Profile
	}	

    input UserCreateInput {
        email: String!
        password: String!
        fullname: String
        numberPhone: String
        province: Int
        district: Int
        ward: Int
        avatar: String
        userType: UserType!
    }


    union NativeRegisterResponse = User | EmailDuplicateError | PasswordInvalidError
    union NativeAuthResponse = User | EmailNotRegisterError | PasswordIncorrectError
    union LogoutResponse = UserNotAuthenticatedError | LogoutStatus

    type EmailDuplicateError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }

    type PasswordInvalidError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }

    type EmailNotRegisterError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }

    type PasswordIncorrectError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }

    type LogoutStatus {
        success: Boolean!
    }

    type Profile {
        user: User
        isAuth: Boolean
    }
`;
