import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { userId, password } = args;
      const existUser = await prisma.$exists.user({ userId });
      try {
        if (existUser) {
          const user = await prisma.user({ userId });
          const snsLoginConfirm = await prisma.user({ userId });
          if (snsLoginConfirm.snsLogin === "facebook") {
            return "facebook";
          } else if (snsLoginConfirm.snsLogin === "google") {
            return "google";
          } else {
            if (password) {
              const valid = await bcrypt.compare(password, user.password);
              if (valid) {
                return generateToken(user.id);
              } else {
                return "비밀번호가 맞지 않습니다.";
              }
            }
          }
        } else {
          return "등록된 아이디가 아닙니다.";
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
