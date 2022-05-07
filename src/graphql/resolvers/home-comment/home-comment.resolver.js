import { HomeCommentCreate } from "./home-comment.mutation";

export default {
	Mutation: {
		createHomeComment: HomeCommentCreate.mutate.bind(HomeCommentCreate),
	}
}