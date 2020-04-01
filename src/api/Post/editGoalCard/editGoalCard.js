import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editGoalCard: async (_, args, { request }) => {
      isAuthenticated(request);
      const {
        goalId,
        goalText,
        dDay,
        category,
        detailCategory,
        cardColor,
        cardPrivate
      } = args;
      const { user } = request;
      const verify = await prisma.$exists.goal({
        AND: [
          {
            user: { id: user.id }
          },
          { id: goalId }
        ]
      });
      if (verify) {
        return prisma.updateGoal({
          where: { id: goalId },
          data: {
            goalText,
            dDay,
            category,
            detailCategory,
            cardColor,
            cardPrivate
          }
        });
      }
    }
  }
};
