import { isAuthenticated } from "../../../../middleware";
import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    editTalkRepply: async (_, args, { request }) => {
      isAuthenticated(request);
      const { talkRepplyId, text } = args;
      const { user } = request;
      const verify = await prisma.$exists.talkRepply({
        AND: [
          {
            user: { id: user.id }
          },
          { id: talkRepplyId }
        ]
      });
      if (verify) {
        try {
          await prisma.updateTalkRepply({
            where: { id: talkRepplyId },
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
