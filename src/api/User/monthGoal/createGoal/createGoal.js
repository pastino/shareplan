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
        startDate,
        dDay,
        cardPrivate,
        keyword,
        division,
        stagePlanText,
        startingDay,
        endDay,
      } = args;
      const { user } = request;
      const today = new Date(0);
      if (division !== "stage") {
        const goal = await prisma.createGoal({
          user: { connect: { id: user.id } },
          goalText,
          category,
          detailCategory,
          cardColor,
          startDate,
          dDay,
          cardPrivate,
          luckyCounts: 0,
          favoriteCounts: 0,
          excellentCounts: 0,
          postUploadDate: today,
          keyWord: keyword,
        });
        await prisma.createGoalInformation({
          goal: { connect: { id: goal.id } },
        });
        await prisma.createGoalHistory({
          goal: { connect: { id: goal.id } },
        });
        return true;
      } else {
        try {
          const goal = await prisma.createGoal({
            user: { connect: { id: user.id } },
            goalText,
            category,
            detailCategory,
            cardColor,
            startDate,
            dDay,
            cardPrivate,
            luckyCounts: 0,
            favoriteCounts: 0,
            excellentCounts: 0,
            postUploadDate: today,
            keyWord: keyword,
          });
          await prisma.createGoalInformation({
            goal: { connect: { id: goal.id } },
          });
          await prisma.createGoalHistory({
            goal: { connect: { id: goal.id } },
          });
          for (let i = 0; i < stagePlanText.length; i++) {
            await prisma.createDetailPlan({
              goal: { connect: { id: goal.id } },
              stagePlanText: stagePlanText[i],
              startingDay: startingDay[i],
              endDay: endDay[i],
            });
          }
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      }
    },
  },
};
