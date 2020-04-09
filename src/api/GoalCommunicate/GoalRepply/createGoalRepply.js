import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { GOAL_REPPLY_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    createGoalRepply: async (_, args, { request }) => {
      isAuthenticated(request);
      const { text, commentId, goalId } = args;
      const { user } = request;
      const repply = await prisma
        .createGoalRepply({
          comment: {
            connect: {
              id: commentId,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
          goal: { connect: { id: goalId } },
          text,
        })
        .$fragment(GOAL_REPPLY_FRAGMENT);
      return repply;
    },
  },
};
