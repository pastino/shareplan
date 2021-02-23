import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editTalkComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { talkCommentId, text } = args;
      const { user } = request;
      const verify = await prisma.$exists.talkComment({
        AND: [
          {
            user: { id: user.id }
          },
          { id: talkCommentId }
        ]
      });
      if (verify) {
        try {
          await prisma.updateTalkComment({
            where: { id: talkCommentId },
            data: { text }
          });
          return true;
        } catch (e) {
          return false;
        }
      }
    }
  }
};
