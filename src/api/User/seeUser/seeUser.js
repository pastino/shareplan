import { prisma } from "../../../../generated/prisma-client";
import { SEE_USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeUser: async (_, args, { request }) => {
      const { id } = args;
      const { user } = request;
      if (user) {
        const userProfile = await prisma
          .user({ id })
          .$fragment(SEE_USER_FRAGMENT);
        return userProfile;
      }
    }
  }
};
