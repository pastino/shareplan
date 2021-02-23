import { prisma } from "../../../../../generated/prisma-client";
import { isAuthenticated } from "../../../../middleware";

export default {
  Mutation: {
    dateOfBirth: async (_, args, { request }) => {
      isAuthenticated(request);
      const { dateOfBirth } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            dateOfBirth
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
