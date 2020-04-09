import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { GOAL_COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    createGoalComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { text, goalId } = args;
      const { user } = request;
      const comment = await prisma
        .createGoalComment({
          goal: {
            connect: {
              id: goalId,
            },
          },
          user: {
            connect: {
              id: user.id,
            },
          },
          text,
        })
        .$fragment(GOAL_COMMENT_FRAGMENT);
      return comment;
    },
  },
};
