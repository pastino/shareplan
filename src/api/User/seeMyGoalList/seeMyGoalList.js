import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { FULL_CARD_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeMyGoalList: (_, __, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma
        .goals({ where: { user: { id: user.id } } })
        .$fragment(FULL_CARD_FRAGMENT);
    },
  },
};
