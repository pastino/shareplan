import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { GOAL_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeHistoryid: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { goalId } = args;
      const goal = await prisma.goal({ id: goalId }).$fragment(GOAL_FRAGMENT);
      return goal.goalHistories.id;
    },
  },
};
