import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    secretConfirm: async (_, args) => {
      try {
        const { email, secret } = args;
        const user = await prisma.user({ userId: email });
        if (user) {
          if (user.loginSecret === secret) {
            return "성공";
          } else {
            return "시크릿 문자가 틀렸습니다.";
          }
        }
      } catch (error) {
        console.log(error);
        return "실패";
      }
    }
  }
};
