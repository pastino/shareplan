import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { TALK_COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    createTalkComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { text, talkId } = args;
      const { user } = request;
      const comment = await prisma
        .createTalkComment({
          talk: {
            connect: {
              id: talkId
            }
          },
          user: {
            connect: {
              id: user.id
            }
          },
          text
        })
        .$fragment(TALK_COMMENT_FRAGMENT);
      return comment;
    }
  }
};
