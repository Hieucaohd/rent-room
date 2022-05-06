import { gql } from 'apollo-server-express';

export default gql`
    scalar Upload
    scalar Date

    type Query {
        _: String
    }

    type Mutation {
        _: String
    }

    type Subscription {
        _: String
    }

    # all type must implement this interface
    interface Timestamps {
        createdAt: Date
        updatedAt: Date
    }

    # all type must implement this interface
    interface Node {
        _id: ID
    }

    type Paginator {
        totalDocs: Int
        limit: Int
        page: Int
        nextPage: Int
        prevPage: Int
        totalPages: Int
        pagingCounter: Int
        hasPrevPage: Boolean
        hasNextPage: Boolean
    }

    enum ArrangeType {
        ASC
        DESC
    }

    input PaginatorOptionsInput {
        page: Int
        limit: Int
        sort: [SortOption]
    }

    input SortOption {
        field: String!
        arrange: ArrangeType!
    }

    interface PaginatorResult {
        docs: [Node]
        paginator: Paginator
    }

    type AfterDelete {
        id: ID!
        success: Boolean
    }

    interface ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }

    type InstanceNotExistError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }

    type PermissionDeninedError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }

    type UserNotAuthenticatedError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }

    enum ErrorCode {
        UNKNOWN_ERROR
    }
`;
