import { isAuthenticated } from "../../../../middleware";
import { prisma } from "../../../../../generated/prisma-client";
import { REPPLY_FRAGMENT } from "../../../../fragments";

export default {
  Mutation: {
    createRepply: async (_, args, { request }) => {
      isAuthenticated(request);
      const { text, commentId, postId } = args;
      const { user } = request;
      const repply = await prisma
        .createRepply({
          comment: {
            connect: {
              id: commentId
            }
          },
          user: {
            connect: {
              id: user.id
            }
          },
          post: { connect: { id: postId } },
          text
        })
        .$fragment(REPPLY_FRAGMENT);
      return repply;
    }
  }
};
