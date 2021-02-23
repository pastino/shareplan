import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const {
        nickname,
        dateOfBirth,
        userId,
        password,
        gender,
        useTermsPrivacyagreement,
        bio
      } = args;
      const idExists = await prisma.$exists.user({
        userId
      });
      const nicknameExists = await prisma.$exists.user({
        nickname
      });
      if (idExists) {
        const snsLoginConfirm = await prisma.user({ userId });
        if (snsLoginConfirm.snsLogin === "facebook") {
          return "facebook";
        } else if (snsLoginConfirm.snsLogin === "google") {
          return "google";
        } else {
          return "이미 아이디가 존재합니다.";
        }
      } else if (nicknameExists) {
        return "이미 닉네임이 존재합니다.";
      } else {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, async function(err, hash) {
            await prisma.createUser({
              nickname,
              password: hash,
              dateOfBirth,
              userId,
              gender,
              useTermsPrivacyagreement,
              bio
            });
          });
        });
        return "성공";
      }
    }
  }
};
