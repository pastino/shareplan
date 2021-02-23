import { isAuthenticated } from "../../../../middleware";
import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteTalkRepply: async (_, args, { request }) => {
      isAuthenticated(request);
      const { talkRepplyId } = args;
      const { user } = request;
      const verify = await prisma.$exists.talkRepply({
        AND: [
          {
            user: { id: user.id }
          },
          { id: talkRepplyId }
        ]
      });
      try {
        if (verify) {
          await prisma.deleteTalkRepply({
            id: talkRepplyId
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
