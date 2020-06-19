import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import axios from "axios";

export default {
  Mutation: {
    saleCancle: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { goalId } = args;
      try {
        await prisma.updateGoal({
          where: { id: goalId },
          data: {
            sale: null,
          },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
