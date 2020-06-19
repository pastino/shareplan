import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Subscription: {
    downloadPercentage: {
      subscribe: () => {
        const test = prisma.$subscribe
          .dayToDo()
          .node()
          .$fragment(DAYTODO_FRAGMENT);
        return test;
      },
      resolve: (payload) => payload,
    },
  },
};
