import { isAuthenticated } from "../../middleware";
import { prisma } from "../../../generated/prisma-client";
import { GOAL_FRAGMENT } from "../../fragments";

export default {
  Query: {
    seeHomeGoal: (_, __, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma
        .goals({ where: { user: { id: user.id } } })
        .$fragment(GOAL_FRAGMENT);
    },
  },
};
