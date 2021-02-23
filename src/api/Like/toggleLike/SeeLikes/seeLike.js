import { prisma } from "../../../../../generated/prisma-client";
import { isAuthenticated } from "../../../../middleware";
import { LIKE_FRAGMENT } from "../../../../fragments";

export default {
  Query: {
    seeLike: (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      return prisma
        .likes({
          where: {
            AND: [
              {
                post: { id: postId }
              }
            ]
          }
        })
        .$fragment(LIKE_FRAGMENT);
    }
  }
};
