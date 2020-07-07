import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { POST_HISTORY_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeHistory: (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { pageNumber, items } = args;
      return prisma
        .posts({
          where: { postPrivate: true },
          first: items,
          skip: pageNumber,
          orderBy: "createdAt_DESC",
        })
        .$fragment(POST_HISTORY_FRAGMENT);
    },
  },
};
