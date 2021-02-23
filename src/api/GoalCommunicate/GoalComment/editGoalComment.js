import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editGoalComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { commentId, text } = args;
      const { user } = request;
      const verify = await prisma.$exists.goalComment({
        AND: [
          {
            user: { id: user.id },
          },
          { id: commentId },
        ],
      });
      if (verify) {
        try {
          await prisma.updateGoalComment({
            where: { id: commentId },
            data: { text },
          });
          return true;
        } catch (e) {
          return false;
        }
      }
    },
  },
};
