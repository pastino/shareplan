import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    deletePost: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id, goalId, toDoId } = args;
      const { user } = request;
      const verify = await prisma.$exists.post({
        AND: [
          {
            user: { id: user.id },
          },
          { id },
        ],
      });
      const goalPosts = await prisma.posts({
        where: { goal: { id: goalId }, id_not: id, postPrivate: true },
      });
      const publicPostArray = goalPosts.map((post) => post.createdAt);

      const latestCreatedAt =
        publicPostArray.length === 0 ||
        publicPostArray === null ||
        publicPostArray === undefined
          ? new Date(0, 0, 0)
          : publicPostArray &&
            publicPostArray.reduce(function(previous, current) {
              return previous > current ? previous : current;
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

        return prisma.dayToDo({ id: toDoId }).$fragment(DAYTODO_FRAGMENT);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
