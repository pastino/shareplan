import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middleware";
import { CLOCK_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeClock: (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { todayYear, todayMonth, todayDate } = args;
      console.log(todayYear, todayMonth, todayDate);
      return prisma
        .clocks({
          where: {
            AND: [{ user: { id: user.id } }]
          }
        })
        .$fragment(CLOCK_FRAGMENT);
    }
  }
};
