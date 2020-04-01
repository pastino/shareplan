import { isAuthenticated } from "../../../../middleware";
import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    createGoal: async (_, args, { request }) => {
      isAuthenticated(request);
      const {
        goalText,
        category,
        detailCategory,
        cardColor,
        dDay,
        cardPrivate
      } = args;
      const { user } = request;
      const goal = await prisma.createGoal({
        user: { connect: { id: user.id } },
        goalText,
        category,
        detailCategory,
        cardColor,
        dDay,
        cardPrivate
      });
      await prisma.createGoalInformation({
        goal: { connect: { id: goal.id } }
      });
      await prisma.createGoalHistory({
        goal: { connect: { id: goal.id } }
      });
      await prisma.createDetailPlan({
        goal: { connect: { id: goal.id } }
      });
      return true;
    }
  }
};
