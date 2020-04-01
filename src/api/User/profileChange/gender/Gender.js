import { prisma } from "../../../../../generated/prisma-client";
import { isAuthenticated } from "../../../../middleware";

export default {
  Mutation: {
    gender: async (_, args, { request }) => {
      isAuthenticated(request);
      const { gender } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            gender
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
