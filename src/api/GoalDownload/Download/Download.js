import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import axios from "axios";

export default {
  Mutation: {
    download: async (_, args, { request }) => {
      isAuthenticated(request);
      const {
        id,
        toDoList,
        color,
        startDate,
        alrams,
        alarmId,
        startTime,
        endDate,
        endTime,
        memo,
        goalId,
        maxEndDate,
        goalText,
        goalStartDate,
        dDay,
        category,
        detailCategory,
        keyWord,
        cardColor,
        cardPrivate,
        originToDoId,
      } = args;
      const { user } = request;

      if (goalId === undefined || goalId === null) {
        const today = new Date();
        const goal = await prisma.createGoal({
          user: { connect: { id: user.id } },
          goalText,
          category,
          detailCategory,
          cardColor,
          startDate: goalStartDate,
          dDay,
          cardPrivate,
          luckyCounts: 0,
          favoriteCounts: 0,
          excellentCounts: 0,
          postUploadDate: today,
          purchase: true,
          keyWord,
        });
        await prisma.createGoalInformation({
          goal: { connect: { id: goal.id } },
        });
        await prisma.createGoalHistory({
          goal: { connect: { id: goal.id } },
        });

        for (let i = 0; i < toDoList.length; i++) {
          const dayToDo = await prisma.createDayToDo({
            toDoList: toDoList[i],
            color: color[i],
            startDate: startDate[i],
            startTime: startTime[i] !== null ? startTime[i] : null,
            endDate: endDate[i],
            endTime: endTime[i] !== null ? endTime[i] : null,
            memo: memo[i] !== null ? memo[i] : null,
            originToDoId: originToDoId[i],
            user: { connect: { id: user.id } },
            complete: false,
            goal: { connect: { id: goal.id } },
          });
          if (alrams[i].length > 0 && alarmId[i].length > 0) {
            for (let j = 0; j < alrams[i].length; j++) {
              await prisma.createAlram({
                time: alrams[i][j],
                categoryId: alarmId[i][j],
                dayToDo: { connect: { id: dayToDo.id } },
              });
            }
          }
        }
      } else {
        if (maxEndDate !== null) {
          await prisma.updateGoal({
            where: { id: goalId },
            data: { dDay: maxEndDate, purchase: true },
          });
        }
        for (let i = 0; i < toDoList.length; i++) {
          const dayToDo = await prisma.createDayToDo({
            toDoList: toDoList[i],
            color: color[i],
            startDate: startDate[i],
            startTime: startTime[i] !== null ? startTime[i] : null,
            endDate: endDate[i],
            endTime: endTime[i] !== null ? endTime[i] : null,
            memo: memo[i] !== null ? memo[i] : null,
            originToDoId: originToDoId[i],
            user: { connect: { id: user.id } },
            complete: false,
            goal: { connect: { id: goalId } },
          });
          if (alrams[i].length > 0 && alarmId[i].length > 0) {
            for (let j = 0; j < alrams[i].length; j++) {
              await prisma.createAlram({
                time: alrams[i][j],
                categoryId: alarmId[i][j],
                dayToDo: { connect: { id: dayToDo.id } },
              });
            }
          }
        }
      }
      const goal = await prisma.goal({ id });
      await prisma.updateGoal({
        where: { id },
        data: {
          downloadCount:
            goal.downloadCount === null ? 1 : goal.downloadCount + 1,
        },
      });
      if (goal.alramToken !== undefined && goal.alramToken !== null) {
        const goalAlarmToken = goal.alramToken;
        const { data } = await axios.post(
          "https://exp.host/--/api/v2/push/send",
          {
            to: goalAlarmToken,
            title: goal.goalText,
            body: `등록하신 목표카드가 공유(다운로드) 되었습니다.`,
          }
        );
      } 
      
      return true;
    },
  },
};
