import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    favoriteToggle: async (_, args, { request }) => {
      isAuthenticated(request);
      const { goalId, filter } = args;
      const { user } = request;
      const currentFavoriteCount = await prisma
        .usersConnection({
          where: { favorites_some: { id: goalId } },
        })
        .aggregate()
        .count();
      try {
        if (filter === false) {
          await prisma.updateGoal({
            where: { id: goalId },
            data: {
              favorites: { connect: { id: user.id } },
              favoriteCounts: currentFavoriteCount + 1,
            },
          });
        } else {
          await prisma.updateGoal({
            where: { id: goalId },
            data: {
              favorites: { disconnect: { id: user.id } },
              favoriteCounts:
                currentFavoriteCount === 1 ? 0 : currentFavoriteCount - 1,
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
