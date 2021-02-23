import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    changePassword: async (_, args) => {
      const { userId, password } = args;
      const idExists = await prisma.$exists.user({
        userId
      });
      if (idExists) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, async function(err, hash) {
            await prisma.updateUser({
              where: { userId },
              data: { password: hash, loginSecret: "" }
            });
          });
        });
        return "비밀번호 변경 완료";
      }
    }
  }
};
