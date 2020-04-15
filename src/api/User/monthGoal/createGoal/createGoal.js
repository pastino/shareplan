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
      const today = new Date(0);
      const goal = await prisma.createGoal({
        user: { connect: { id: user.id } },
        goalText,
        category,
        detailCategory,
        cardColor,
        dDay,
        cardPrivate,
        luckyCounts: 0,
        favoriteCounts: 0,
        excellentCounts: 0,
        postUploadDate: today
      });
      await prisma.createGoalInformation({
        goal: { connect: { id: goal.id } }
      });
      await prisma.createGoalHistory({
        goal: { connect: { id: goal.id } }
      });

      return true;
    }
  }
};
