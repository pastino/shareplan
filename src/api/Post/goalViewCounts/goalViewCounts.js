import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    goalViewCounts: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { goalId } = args;
      const viewCount = await prisma.goal({ id: goalId }).viewCounts();
      return prisma.updateGoal({
        where: { id: goalId },
        data: { viewCounts: viewCount + 1 },
      });
    },
  },
};
