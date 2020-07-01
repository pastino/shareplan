import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    likeCount: (parent, _, { request }) => {
      const { id } = parent;
      const { user } = request;
      return prisma
        .usersConnection({ where: { id: user.id } })
        .aggregate()
        .count();
    },
  },
};
