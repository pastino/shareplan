import { prisma } from "../../../../generated/prisma-client";
import { SEE_USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeUser: async (_, args, { request }) => {
      const { user } = request;
      const { id } = args;
      return await prisma.user({ id }).$fragment(SEE_USER_FRAGMENT);
    },
  },
};
