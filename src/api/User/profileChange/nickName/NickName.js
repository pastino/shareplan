import { prisma } from "../../../../../generated/prisma-client";
import { isAuthenticated } from "../../../../middleware";

export default {
  Mutation: {
    nickName: async (_, args, { request }) => {
      isAuthenticated(request);
      const { nickname } = args;
      const { user } = request;
      const existNickname = await prisma.$exists.user({ nickname });
      if (existNickname) {
        return "이미 닉네임을 사용중 입니다.";
      } else {
        try {
          await prisma.updateUser({
            where: { id: user.id },
            data: {
              nickname
            }
          });
          return "성공";
        } catch (error) {
          console.log(error);
          return "실패";
        }
      }
    }
  }
};
