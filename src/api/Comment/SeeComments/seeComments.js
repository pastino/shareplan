import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeComments: (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { postId, limit, offset } = args;
      return prisma
        .comments({
          // first: limit,
          // skip: offset,
          where: {
            post: { id: postId }
          }
        })
        .$fragment(COMMENT_FRAGMENT);
    }
  }
};
