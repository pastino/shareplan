import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteNotice: async (_, args, { request }) => {
      isAuthenticated(request);
      const { noticeId } = args;
      const { user } = request;
      const verify = await prisma.$exists.notice({
        id: noticeId
      });

      try {
        if (verify && user.userId === "joon5006@naver.com") {
          console.log(1);
          await prisma.deleteNotice({
            id: noticeId
          });
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
