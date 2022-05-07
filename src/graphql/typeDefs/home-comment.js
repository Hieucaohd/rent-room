import { gql } from 'apollo-server-express';

export default gql`
    extend type Mutation {
        createHomeComment(input: HomeCommentCreateInput!): CreateHomeCommentResult!
        updateHomeComment(input: HomeCommentUpdateInput!): UpdateHomeCommentResult!
        deleteHomeComment(id: ID!): DeleteHomeCommentResult!
    }

    extend type Query {
        allHomeCommentsInHome(query: AllHomeCommentsInHomeQuery!, paginatorOptions: PaginatorOptionsInput!): HomeCommentPaginator
        getHomeCommentById(id: ID!): GetHomeCommentByIdResult
    }

    input AllHomeCommentsInHomeQuery {
        home: ID!
    }

    input HomeCommentCreateInput {
		home: ID!
        content: String
        images: [String]
        rateStar: Int
    }

    input HomeCommentUpdateInput {
		id: ID!
        content: String
        images: [String]
        rateStar: Int
    }

    type HomeComment implements Node & Timestamps {
        _id: ID
        createdAt: Date
        updatedAt: Date

        home: Home
        user: User
        content: String
        images: [String]
        rateStar: Int
    }

    type HomeCommentPaginator implements PaginatorResult {
        docs: [HomeComment]
        paginator: Paginator
    }

    type UserNotRentedHomeError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }

    union CreateHomeCommentResult = HomeComment | UserNotRentedHomeError
    union UpdateHomeCommentResult = HomeComment | InstanceNotExistError | PermissionDeninedError
    union DeleteHomeCommentResult = AfterDelete | InstanceNotExistError | PermissionDeninedError
    union GetHomeCommentByIdResult = HomeComment | InstanceNotExistError
`;
