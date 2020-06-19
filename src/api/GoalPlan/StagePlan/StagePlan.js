import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    StagePlan: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { stagePlanText, startingDay, endDay, goalId } = args;

      try {
        for (let i = 0; i < stagePlanText.length; i++) {
          console.log(goalId);
          await prisma.createDetailPlan({
            goal: { connect: { id: goalId } },
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
    },
  },
};
