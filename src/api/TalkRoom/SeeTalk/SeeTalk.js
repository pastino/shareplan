import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { TALK_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeTalk: (_, agrs, { request }) => {
      isAuthenticated(request);
      const { pageNumber, items } = agrs;
      return prisma
        .talks({
          where: { AND: [{ division: "good" }] },
          first: items,
          skip: pageNumber,
          orderBy: "createdAt_DESC"
        })
        .$fragment(TALK_FRAGMENT);
    }
  }
};
