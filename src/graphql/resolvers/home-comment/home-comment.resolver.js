import { HomeCommentCreate, HomeCommentDelete, HomeCommentUpdate } from './home-comment.mutation';
import { HomeCommentById, ListHomeComments } from './home-comment.query';

export default {
    Mutation: {
        createHomeComment: HomeCommentCreate.mutate.bind(HomeCommentCreate),
        updateHomeComment: HomeCommentUpdate.mutate.bind(HomeCommentUpdate),
        deleteHomeComment: HomeCommentDelete.mutate.bind(HomeCommentDelete),
    },
    Query: {
        getHomeCommentById: HomeCommentById.query.bind(HomeCommentById),
        allHomeCommentsInHome: ListHomeComments.query.bind(ListHomeComments),
    },
};
