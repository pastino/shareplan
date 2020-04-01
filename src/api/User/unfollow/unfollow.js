import { prisma } from "../../../../generated/prisma-client";
import { SEE_USER_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    unfollow: async (_, args, { request }) => {
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id },
          data: { followers: { disconnect: { id: user.id } } }
        });
        const me = await prisma
          .user({ id: user.id })
          .$fragment(SEE_USER_FRAGMENT);
        return me;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
