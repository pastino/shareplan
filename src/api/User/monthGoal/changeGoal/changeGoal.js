import { isAuthenticated } from "../../../../middleware";
import { prisma } from "../../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    changeMonthGoal: async (_, args, { request }) => {
      isAuthenticated(request);
      const { goalId, goalText, dDay, action } = args;
      const { user } = request;
      const verify = await prisma.$exists.goal({
        AND: [
          { user: { id: user.id } },
          {
            goalId
          }
        ]
      });

      if (action === "EDIT") {
        if (verify) {
          return prisma.updateGoal({
            where: { id: goalId },
            data: { goalText, dDay }
          });
        } else if (action === "DELETE") {
          if (verify) {
            return prisma.deletePost({ goalId });
          }
        } else {
          throw Error("아직 목표를 설정하지 않았습니다.");
        }
      }
    }
  }
};
