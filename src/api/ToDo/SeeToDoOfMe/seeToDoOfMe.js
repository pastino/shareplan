import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    dayToDoes: (_, __, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma
        .dayToDoes({ where: { user: { id: user.id } } })
        .$fragment(DAYTODO_FRAGMENT);
    }
  }
};
