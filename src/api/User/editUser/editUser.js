import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middleware";

export default {
  Mutation: {
    editUser: (_, args, { request }) => {
      isAuthenticated(request);
      const { avatar, nickname, dateOfBirth, userId, gender, bio } = args;
      const { user } = request;
      try {
        return prisma.updateUser({
          where: { id: user.id },
          data: {
            avatar,
            nickname,
            userId,
            dateOfBirth,
            gender,
            bio
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
