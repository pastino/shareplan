import { isAuthenticated } from "../../../../middleware";
import { prisma } from "../../../../../generated/prisma-client";
import { TALK_REPPLY_FRAGMENT } from "../../../../fragments";

export default {
  Mutation: {
    createTalkRepply: async (_, args, { request }) => {
      isAuthenticated(request);
      const { text, talkCommentId, talkId } = args;
      const { user } = request;
      const repply = await prisma
        .createTalkRepply({
          talkComment: {
            connect: {
              id: talkCommentId
            }
          },
          user: {
            connect: {
              id: user.id
            }
          },
          talk: { connect: { id: talkId } },
          text
        })
        .$fragment(TALK_REPPLY_FRAGMENT);
      return repply;
    }
  }
};
