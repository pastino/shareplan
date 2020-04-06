import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deletePost: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id, goalId, latestCreatedAt } = args;
      const { user } = request;
      const verify = await prisma.$exists.post({
        AND: [
          {
            user: { id: user.id },
          },
          { id },
        ],
      });
      try {
        if (verify) {
          await prisma.deletePost({
            id,
          });
          await prisma.updateGoal({
            where: { id: goalId },
            data: {
              postUploadDate: latestCreatedAt,
            },
          });
        }
        return true;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
