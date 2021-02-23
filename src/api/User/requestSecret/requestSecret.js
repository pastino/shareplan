import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      try {
        const { email } = args;
        const loginSecret = generateSecret();
        const existUser = await prisma.user({ userId: email });
        if (existUser) {
          await prisma.updateUser({
            data: { loginSecret },
            where: { userId: email }
          });
          await sendSecretMail(loginSecret, email);
          return "성공";
        } else {
          return "가입된 이메일이 아닙니다.";
        }
      } catch (error) {
        console.log(error);
        return "실패";
      }
    }
  }
};
