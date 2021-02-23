import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { FULL_CARD_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeGoalConfirm: (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { userId } = args;
      if (userId === process.env.OPERATOR_ID) {
        return prisma
          .goals({ where: { sale: "검토중" } })
          .$fragment(FULL_CARD_FRAGMENT);
      } else {
        return null;
      }
    },
  },
};
