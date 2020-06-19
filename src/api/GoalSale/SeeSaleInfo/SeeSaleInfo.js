import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import axios from "axios";

export default {
  Query: {
    seeSaleInfo: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { goalId } = args;
      return await prisma.goal({
        id: goalId,
      });
    },
  },
};
