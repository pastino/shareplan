import { prisma } from "../../../../../generated/prisma-client";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    passwordChange: async (_, args, { request }) => {
      const { currentPassword, changePassword } = args;
      const { user } = request;
      const valid = await bcrypt.compare(currentPassword, user.password);
      if (valid) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(changePassword, salt, async function(err, hash) {
            await prisma.updateUser({
              where: { id: user.id },
              data: { password: hash }
            });
          });
        });
        return "변경완료";
      } else {
        return "현재 비밀번호가 다릅니다.";
      }
    }
  }
};
