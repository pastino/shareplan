import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    scheduleChangeToDo: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { dayToDoId, monthDay } = args;
      const changeToDoLength = await prisma.dayToDoes({
        where: {
          AND: [
            { user: { id: user.id } }, { monthDay }
          ]
        }
      })
      console.log(changeToDoLength)
      return prisma
        .updateDayToDo({
          where: { id: dayToDoId },
          data: { monthDay, index: changeToDoLength.length + 1 },
        })
        .$fragment(DAYTODO_FRAGMENT);
    },
  },
};
