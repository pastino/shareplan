import { isAuthenticated } from "../../middleware";
import { prisma } from "../../../generated/prisma-client";
import { CLOCK_FRAGMENT } from "../../fragments";

export default {
  Mutation: {
    wakeUpClock: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { wakeUpTime, todayYear, todayMonth, todayDate } = args;
      return prisma
        .createClock({
          wakeUpTime,
          todayYear,
          todayMonth,
          todayDate,
          user: { connect: { id: user.id } }
        })
        .$fragment(CLOCK_FRAGMENT);
    }
  }
};
