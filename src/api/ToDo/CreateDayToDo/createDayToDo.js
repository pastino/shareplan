import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    createDayToDo: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { monthDay, toDoList, importEvent } = args;
      return await prisma
        .createDayToDo({
          user: { connect: { id: user.id } },
          monthDay,
          toDoList,
          importEvent,
          complete: false
        })
        .$fragment(DAYTODO_FRAGMENT);
    }
  }
};
