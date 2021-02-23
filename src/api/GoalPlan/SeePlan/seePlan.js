import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { FULL_CARD_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seePlan: (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { goalId } = args;
      return prisma.goal({ id: goalId }).$fragment(FULL_CARD_FRAGMENT);
    },
  },
};
