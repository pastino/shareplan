import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    idDoubleCheck: async (_, args, ___) => {
      const { userId } = args;
      const allUserId = await prisma.$exists.user({ userId });
      return allUserId;
    }
  }
};
