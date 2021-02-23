import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    execellentToggle: async (_, args, { request }) => {
      isAuthenticated(request);
      const { goalId, filter } = args;
      const { user } = request;
      const currentExcellentCount = await prisma
        .usersConnection({
          where: { excellents_some: { id: goalId } },
        })
        .aggregate()
        .count();
      try {
        if (filter === false) {
          await prisma.updateGoal({
            where: { id: goalId },
            data: {
              excellents: { connect: { id: user.id } },
              excellentCounts: currentExcellentCount + 1,
            },
          });
        } else {
          await prisma.updateGoal({
            where: { id: goalId },
            data: {
              excellents: { disconnect: { id: user.id } },
              excellentCounts:
                currentExcellentCount === 1 ? 0 : currentExcellentCount - 1,
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
