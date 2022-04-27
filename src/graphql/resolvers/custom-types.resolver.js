import GraphQLUpload from "graphql-upload";
import { dateScalar } from "../custom-fields/date-scalar";

export default {
    Upload: GraphQLUpload,
	Date: dateScalar
};
