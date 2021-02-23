import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { GOAL_COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeGoalComment: (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { goalId, pageNumber, items } = args;
      return prisma
        .goalComments({
          where: { goal: { id: goalId } },
          first: items,
          skip: pageNumber,
          orderBy: "createdAt_DESC",
        })
        .$fragment(GOAL_COMMENT_FRAGMENT);
    },
  },
};
