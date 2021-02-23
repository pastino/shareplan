import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteGoalRepply: async (_, args, { request }) => {
      isAuthenticated(request);
      const { repplyId } = args;
      const { user } = request;
      const verify = await prisma.$exists.goalRepply({
        AND: [
          {
            user: { id: user.id },
          },
          { id: repplyId },
        ],
      });
      try {
        if (verify) {
          await prisma.deleteGoalRepply({
            id: repplyId,
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
