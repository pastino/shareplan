import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeedOrdering: (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.user({
        id: user.id
      });
    }
  }
};
