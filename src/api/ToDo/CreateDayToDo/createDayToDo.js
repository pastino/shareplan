import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    createDayToDo: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        toDoList,
        color,
        startDate,
        startTime,
        endDate,
        endTime,
        alrams,
        categoryId,
        memo,
        goalId,
        today,
      } = args;
      const test = await prisma.dayToDoes({
        where: { user: { id: user.id } },
      });
      const tetest = test.filter(
        (toDo) => toDo.startDate <= today && toDo.endDate <= today
      );

      const tttt = tetest.map((toDo) => toDo.index);
      const max = tetest.length === 0 ? 0 : Math.max.apply(null, tttt);

      if (alrams !== null) {
        const toDo = await prisma
          .createDayToDo({
            user: { connect: { id: user.id } },
            toDoList,
            color,
            startDate,
            startTime,
            endDate,
            endTime,
            memo,
            goal: !goalId ? null : { connect: { id: goalId } },
            complete: false,
            index: null,
          })
          .$fragment(DAYTODO_FRAGMENT);
        for (let i = 0; i < alrams.length; i++) {
          await prisma.createAlram({
            time: alrams[i],
            categoryId: categoryId[i],
            dayToDo: { connect: { id: toDo.id } },
          });
        }
        return await prisma
          .dayToDo({ id: toDo.id })
          .$fragment(DAYTODO_FRAGMENT);
      } else {
        return await prisma
          .createDayToDo({
            user: { connect: { id: user.id } },
            toDoList,
            color,
            startDate,
            startTime,
            endDate,
            endTime,
            memo,
            goal: !goalId ? null : { connect: { id: goalId } },
            complete: false,
            index: null,
          })
          .$fragment(DAYTODO_FRAGMENT);
      }
    },
  },
};
