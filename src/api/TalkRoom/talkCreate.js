import { isAuthenticated } from "../../middleware";
import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    talkCreate: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { talkText, division } = args;
      await prisma.createTalk({
        user: { connect: { id: user.id } },
        talkText,
        division
      });
      return true;
    }
  }
};
