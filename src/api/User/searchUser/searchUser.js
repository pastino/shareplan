import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: (_, args) => {
      const { term } = args;
      return prisma.users({
        where: {
          OR: [{ nickname_contains: term }]
        }
      });
    }
  }
};
