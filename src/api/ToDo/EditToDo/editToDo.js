import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    editToDo: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id, toDoList, importEvent, complete } = args;
      const verify = await prisma.$exists.dayToDo({ id });
      if (verify) {
        return prisma
          .updateDayToDo({
            where: { id },
            data: { toDoList, importEvent, complete }
          })
          .$fragment(DAYTODO_FRAGMENT);
      }
    }
  }
};
