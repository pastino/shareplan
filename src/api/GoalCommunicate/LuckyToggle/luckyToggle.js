import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    luckyToggle: async (_, args, { request }) => {
      isAuthenticated(request);
      const { goalId, filter } = args;
      const { user } = request;
      const currentLuckyCount = await prisma
        .usersConnection({
          where: { luckies_some: { id: goalId } },
        })
        .aggregate()
        .count();
      try {
        if (filter === false) {
          await prisma.updateGoal({
            where: { id: goalId },
            data: {
              luckies: { connect: { id: user.id } },
              luckyCounts: currentLuckyCount + 1,
            },
          });
        } else {
          await prisma.updateGoal({
            where: { id: goalId },
            data: {
              luckies: { disconnect: { id: user.id } },
              luckyCounts:
                currentLuckyCount === 1 ? null : currentLuckyCount - 1,
            },
          });
        }
        const me = await prisma.user({ id: user.id });
        return me;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
