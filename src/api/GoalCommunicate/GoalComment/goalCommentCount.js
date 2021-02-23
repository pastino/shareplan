import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { GOAL_COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    goalCommentCount: (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { goalId } = args;
      return prisma.goal({
        id: goalId,
      });
    },
  },
};
