import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteTalkComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { talkCommentId } = args;
      const { user } = request;
      const verify = await prisma.$exists.talkComment({
        AND: [
          {
            user: { id: user.id }
          },
          { id: talkCommentId }
        ]
      });
      try {
        if (verify) {
          await prisma.deleteTalkComment({
            id: talkCommentId
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
