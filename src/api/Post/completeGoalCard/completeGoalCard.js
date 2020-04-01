import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    completeGoalCard: async (_, args, { request }) => {
      isAuthenticated(request);
      const { goalId } = args;
      const { user } = request;
      const verify = await prisma.$exists.goal({
        AND: [
          {
            user: { id: user.id }
          },
          { id: goalId }
        ]
      });
      const date = new Date();
      if (verify) {
        await prisma.updateGoal({
          where: { id: goalId },
          data: { complete: true, completeDate: date }
        });
        return true;
      }
    }
  }
};
