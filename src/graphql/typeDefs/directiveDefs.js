import { gql } from "apollo-server-express";

export default gql`
    directive @authRequire on FIELD_DEFINITION
    directive @getListRelate(
        field: String
        collection: String
    ) on FIELD_DEFINITION
`;
