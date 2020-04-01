import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createSuggestion: async (_, args, { request }) => {
      isAuthenticated(request);
      const { text, image } = args;
      const { user } = request;
      try {
        await prisma.createSuggestion({
          user: { connect: { id: user.id } },
          text,
          image
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
