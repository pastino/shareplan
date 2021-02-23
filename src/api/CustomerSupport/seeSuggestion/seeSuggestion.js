import "../../../env";
import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { SUGGESTION_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeSuggestion: (_, __, { request }) => {
      isAuthenticated(request);
      const { user } = request;

      if (user.userId === process.env.OPERATOR_ID) {
        return prisma.suggestions().$fragment(SUGGESTION_FRAGMENT);
      }
    }
  }
};
