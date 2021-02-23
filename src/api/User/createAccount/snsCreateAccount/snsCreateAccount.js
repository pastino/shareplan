import { prisma } from "../../../../../generated/prisma-client";
import { generateToken } from "../../../../utils";

export default {
  Mutation: {
    snsCreateAccount: async (_, args) => {
      const {
        nickname,
        dateOfBirth,
        userId,
        gender,
        useTermsPrivacyagreement,
        snsLogin
      } = args;

      const nicknameExists = await prisma.$exists.user({
        nickname
      });
      if (nicknameExists) {
        return "이미 닉네임이 존재합니다.";
      } else {
        const createdUser = await prisma.createUser({
          nickname,
          dateOfBirth,
          userId,
          gender,
          useTermsPrivacyagreement,
          snsLogin
        });
        return generateToken(createdUser.id);
      }
    }
  }
};
