import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    modifyStagePlan: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        stagePlanText,
        startingDay,
        endDay,
        goalId,
        updatePlanNumber,
        stagePlan,
        updatePlanId,
        deletePlanId,
        modifyDivision,
      } = args;
      try {
        if (modifyDivision === "updateAfterAdd") {
          for (let i = 0; i < updatePlanNumber; i++) {
            await prisma.updateDetailPlan({
              where: { id: updatePlanId[i] },
              data: {
                stagePlanText: stagePlanText[i],
                startingDay: startingDay[i],
                endDay: endDay[i],
              },
            });
          }
          for (let i = updatePlanNumber; i < stagePlan; i++) {
            await prisma.createDetailPlan({
              goal: { connect: { id: goalId } },
              stagePlanText: stagePlanText[i],
              startingDay: startingDay[i],
              endDay: endDay[i],
            });
          }
        } else if (modifyDivision === "deleteAfterUpdate") {
          for (let i = 0; i < deletePlanId.length; i++) {
            await prisma.deleteDetailPlan({
              id: deletePlanId[i],
            });
          }
          for (let i = 0; i < updatePlanNumber; i++) {
            await prisma.updateDetailPlan({
              where: { id: updatePlanId[i] },
              data: {
                stagePlanText: stagePlanText[i],
                startingDay: startingDay[i],
                endDay: endDay[i],
              },
            });
          }
        } else if (modifyDivision === "update") {
          for (let i = 0; i < updatePlanNumber; i++) {
            await prisma.updateDetailPlan({
              where: { id: updatePlanId[i] },
              data: {
                stagePlanText: stagePlanText[i],
                startingDay: startingDay[i],
                endDay: endDay[i],
              },
            });
          }
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
