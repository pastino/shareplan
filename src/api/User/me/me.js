import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { SEE_USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    me: (_, __, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.user({ id: user.id }).$fragment(SEE_USER_FRAGMENT);
    }
  }
};
