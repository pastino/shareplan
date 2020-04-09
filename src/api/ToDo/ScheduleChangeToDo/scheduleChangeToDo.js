import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    scheduleChangeToDo: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { dayToDoId, monthDay } = args;
      return prisma
        .updateDayToDo({
          where: { id: dayToDoId },
          data: { monthDay, index: 1000 },
        })
        .$fragment(DAYTODO_FRAGMENT);
    },
  },
};
