import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    talkDelete: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { talkId } = args;
      const existTalk = await prisma.$exists.talk({
        AND: [{ user: { id: user.id } }, { id: talkId }]
      });
      if (existTalk) {
        try {
          await prisma.deleteTalk({ id: talkId });
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      } else {
        return false;
      }
    }
  }
};
