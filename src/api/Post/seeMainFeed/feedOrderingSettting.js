import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    feedOrderingSettting: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { ordering } = args;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: { feedOrdering: ordering }
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
