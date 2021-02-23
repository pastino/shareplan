import { isAuthenticated } from "../../../../middleware";
import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteRepply: async (_, args, { request }) => {
      isAuthenticated(request);
      const { repplyId } = args;
      const { user } = request;
      const verify = await prisma.$exists.repply({
        AND: [
          {
            user: { id: user.id }
          },
          { id: repplyId }
        ]
      });
      try {
        if (verify) {
          await prisma.deleteRepply({
            id: repplyId
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
