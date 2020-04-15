import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    StagePlan: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { stagePlanText, startingDay, endDay, goalId } = args;

      for (let i = 0; i < stagePlanText.length; i++) {
        await prisma.createDetailPlan({
          goal: { connect: { id: goalId } },
          stagePlanText: stagePlanText[i],
          startingDay: startingDay[i],
          endDay: endDay[i]
        });
      }
      return true;
    }
  }
};
