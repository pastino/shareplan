import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    addComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { text, postId } = args;
      const { user } = request;
      const comment = await prisma
        .createComment({
          post: {
            connect: {
              id: postId
            }
          },
          user: {
            connect: {
              id: user.id
            }
          },
          text
        })
        .$fragment(COMMENT_FRAGMENT);
      return comment;
    }
  }
};
