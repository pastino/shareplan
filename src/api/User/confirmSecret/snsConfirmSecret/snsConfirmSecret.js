import { prisma } from "../../../../../generated/prisma-client";
import { generateToken } from "../../../../utils";

export default {
  Mutation: {
    snsConfirmSecret: async (_, args) => {
      const { userId } = args;
      const existUser = await prisma.$exists.user({ userId });
      try {
        if (existUser) {
          const user = await prisma.user({ userId });
          return generateToken(user.id);
        } else {
          return "등록된 아이디가 아닙니다.";
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
