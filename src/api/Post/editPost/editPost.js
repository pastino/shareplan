import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editPost: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id, caption, title, postPrivate, goalId, latestCreatedAt } = args;
      const { user } = request;
      const verify = await prisma.$exists.post({
        AND: [
          {
            user: { id: user.id },
          },
          { id },
        ],
      });
      if (verify) {
        if (goalId && latestCreatedAt) {
          console.log();
          await prisma.updateGoal({
            where: { id: goalId },
            data: { postUploadDate: latestCreatedAt },
          });
        }
        return prisma.updatePost({
          where: { id },
          data: { caption, title, postPrivate },
        });
      }
    },
  },
};
