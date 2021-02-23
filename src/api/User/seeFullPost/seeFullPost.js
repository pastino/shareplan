import { prisma } from "../../../../generated/prisma-client";
import { FULL_POST_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: (_, args) => {
      const { postId } = args;
      return prisma.post({ id: postId }).$fragment(FULL_POST_FRAGMENT);
    }
  }
};
