import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { GOAL_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeGoal: (_, args, { request }) => {
      isAuthenticated(request);
      const { goalId } = args;
      return prisma
        .goal({
          id: goalId
        })
        .$fragment(GOAL_FRAGMENT);
    }
  }
};
