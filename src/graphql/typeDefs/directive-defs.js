import { gql } from "apollo-server-express";

export default gql`
    directive @authRequire on FIELD_DEFINITION

    directive @isOwner(
        collectionName: String!
    ) on FIELD_DEFINITION
`;
