import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    nicknameDoubleCheck: async (_, args, ___) => {
      const { nickname } = args;
      return prisma.$exists.user({ nickname });
    }
  }
};
