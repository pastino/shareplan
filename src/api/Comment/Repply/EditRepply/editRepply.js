import { isAuthenticated } from "../../../../middleware";
import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    editRepply: async (_, args, { request }) => {
      isAuthenticated(request);
      const { repplyId, text } = args;
      const { user } = request;
      const verify = await prisma.$exists.repply({
        AND: [
          {
            user: { id: user.id }
          },
          { id: repplyId }
        ]
      });
      if (verify) {
        try {
          await prisma.updateRepply({
            where: { id: repplyId },
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
