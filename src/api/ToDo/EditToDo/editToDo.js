import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    editToDo: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const {
        id,
        toDoList,
        color,
        startDate,
        startTime,
        endDate,
        endTime,
        deleteAlrams,
        createAlrams,
        memo,
        goalId,
        categoryId,
        categoryTime,
      } = args;
      const verify = await prisma.$exists.dayToDo({ id });

      if (verify) {
        let editToDo;
        if (goalId !== null) {
          editToDo = await prisma
            .updateDayToDo({
              where: { id },
              data: {
                toDoList,
                color,
                startDate,
                startTime,
                endDate,
                endTime,
                memo,
                goal: { connect: { id: goalId } },
              },
            })
            .$fragment(DAYTODO_FRAGMENT);
        } else {
          editToDo = await prisma
            .updateDayToDo({
              where: { id },
              data: {
                toDoList,
                color,
                startDate,
                startTime,
                endDate,
                endTime,
                memo,
              },
            })
            .$fragment(DAYTODO_FRAGMENT);
        }

        const test = await prisma.dayToDo({ id }).alrams();
        const originTime = test.map((alarm) => alarm.time);

        const updateId = [];
        const createId = [];
        if (categoryTime !== undefined) {
          for (let i = 0; i < categoryTime.length; i++) {
            if (categoryTime.includes(originTime[i]) === true) {
              updateId.push({
                categoryId: categoryId[i],
                id: test.filter((alarm) => alarm.time === originTime[i])[0].id,
              });
            } else {
              createId.push(categoryId[i]);
            }
          }
        }

        if (
          deleteAlrams !== null ||
          createAlrams !== null ||
          updateId.length > 0
        ) {
          if (deleteAlrams !== null && deleteAlrams.length > 0) {
            for (let i = 0; i < deleteAlrams.length; i++) {
              await prisma.deleteAlram({ id: deleteAlrams[i] });
            }
          }
          if (updateId.length > 0) {
            for (let i = 0; i < updateId.length; i++) {
              await prisma.updateAlram({
                where: { id: updateId[i].id },
                data: { categoryId: updateId[i].categoryId },
              });
            }
          }
          if (createAlrams !== null && createAlrams.length > 0) {
            for (let i = 0; i < createAlrams.length; i++) {
              await prisma.createAlram({
                time: createAlrams[i],
                dayToDo: { connect: { id } },
                categoryId: createId[i],
              });
            }
          }
          return await prisma.dayToDo({ id }).$fragment(DAYTODO_FRAGMENT);
        } else {
          return editToDo;
        }
      }
    },
  },
};
