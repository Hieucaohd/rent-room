import GraphQLUpload from "graphql-upload/public/GraphQLUpload";
import { dateScalar } from "../custom-fields/date-scalar";

export default {
    Upload: GraphQLUpload,
	Date: dateScalar
};
