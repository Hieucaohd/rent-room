import { gql } from "apollo-server-express";

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

    interface PaginatorResult {
        docs: [Node]
        paginator: Paginator
    }

    type AfterDelete {
        id: ID!
        success: Boolean
    }
`;
