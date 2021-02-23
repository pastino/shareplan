import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    toDoPlanCreate: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { goalId, monthDay, toDoList, importEvent, index } = args;
      const toDoes = [];
      for (let i = 0; i < monthDay.length; i++) {
        const createdToDo = await prisma.dayToDoes({
          where: { monthDay: monthDay[i], user: { id: user.id } },
        });

        const biggestIndex =
          createdToDo.length !== 0
            ? createdToDo.reduce((prev, cur) =>
                prev.index > cur.index ? prev : cur
              ).index + 1
            : 1;

        console.log(biggestIndex);

        const toDo = await prisma
          .createDayToDo({
            goal: { connect: { id: goalId } },
            monthDay: monthDay[i],
            toDoList: toDoList,
            importEvent: importEvent,
            user: { connect: { id: user.id } },
            index: biggestIndex,
            complete: false,
          })
          .$fragment(DAYTODO_FRAGMENT);
        toDoes.concat(toDo);
      }
      return toDoes;
    },
  },
};
