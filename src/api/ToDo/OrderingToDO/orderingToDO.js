import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    orderingToDO: async (_, args, { request }) => {
      isAuthenticated(request);
      const { toDoId } = args;
      for (let i = 0; i < toDoId.length; i++) {
        await prisma.updateDayToDo({
          where: { id: toDoId[i] },
          data: { index: i },
        });
      }
      return true;
    },
  },
};
