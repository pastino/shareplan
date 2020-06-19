import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    goalSelectView: (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;

      return prisma.goals({
        where: {
          AND: [{ user: { id: user.id } }],
        },
      });
    },
  },
};
