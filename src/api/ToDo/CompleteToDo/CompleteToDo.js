import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    completeToDo: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { toDoId, complete } = args;
      const findToDoId = await prisma.$exists.dayToDo({
        id: toDoId,
      });
      try {
        if (findToDoId) {
          const completeToDo = await prisma
            .updateDayToDo({
              where: { id: toDoId },
              data: { complete },
            })
            .$fragment(DAYTODO_FRAGMENT);
          return completeToDo;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
