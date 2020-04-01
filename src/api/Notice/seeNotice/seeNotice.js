import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { SEE_USER_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeNotice: (_, __, { request }) => {
      isAuthenticated(request);
      return prisma.notices();
    }
  }
};
