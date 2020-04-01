import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { commentId } = args;
      const { user } = request;
      const verify = await prisma.$exists.comment({
        AND: [
          {
            user: { id: user.id }
          },
          { id: commentId }
        ]
      });
      try {
        if (verify) {
          await prisma.deleteComment({
            id: commentId
          });
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
