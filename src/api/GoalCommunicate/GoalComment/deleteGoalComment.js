import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteGoalComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { commentId } = args;
      const { user } = request;
      const verify = await prisma.$exists.goalComment({
        AND: [
          {
            user: { id: user.id },
          },
          { id: commentId },
        ],
      });
      try {
        if (verify) {
          await prisma.deleteGoalComment({
            id: commentId,
          });
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
