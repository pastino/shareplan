import { prisma } from "../../../../../generated/prisma-client";
import { isAuthenticated } from "../../../../middleware";

export default {
  Mutation: {
    deleteAvatar: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            avatar: null
          }
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
