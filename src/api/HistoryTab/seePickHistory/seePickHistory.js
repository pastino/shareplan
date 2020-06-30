import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { POST_HISTORY_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seePickHistory: (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { postId } = args;
      return prisma.post({ id: postId }).$fragment(POST_HISTORY_FRAGMENT);
    },
  },
};
