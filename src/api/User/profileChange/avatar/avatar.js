import { prisma } from "../../../../../generated/prisma-client";
import { isAuthenticated } from "../../../../middleware";

export default {
  Mutation: {
    avatar: async (_, args, { request }) => {
      isAuthenticated(request);
      const { avatar } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            avatar
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
