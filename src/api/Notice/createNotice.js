import { isAuthenticated } from "../../middleware";
import { prisma } from "../../../generated/prisma-client";

export default {
  Mutation: {
    createNotice: async (_, args, { request }) => {
      isAuthenticated(request);
      const { title, text, userId } = args;
      const { user } = request;
      if (userId === "joon5006@naver.com") {
        await prisma.createNotice({
          title,
          text
        });
      }
      return true;
    }
  }
};
