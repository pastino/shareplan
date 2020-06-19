import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeToDoOfGoal: (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { goalId } = args;
      return prisma
        .dayToDoes({
          where: { AND: [{ goal: { id: goalId } }] },
        })
        .$fragment(DAYTODO_FRAGMENT);
    },
  },
};
