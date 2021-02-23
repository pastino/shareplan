import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteToDo: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const verify = await prisma.$exists.dayToDo({ id });
      if (verify) {
        return prisma.deleteDayToDo({ id });
      }
    }
  }
};
