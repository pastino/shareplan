import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { POST_HISTORY_FRAGMENT, DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    historyUpload: async (_, args, { request }) => {
      isAuthenticated(request);
      const {
        caption,
        files,
        postRatio,
        title,
        assortment,
        goalHistoryId,
        goalId,
        postPrivate,
        toDoId,
      } = args;
      const { user } = request;
      console.log(postRatio);
      const post = await prisma
        .createPost({
          goalHistory: { connect: { id: goalHistoryId } },
          title,
          assortment,
          caption,
          postPrivate,
          dayTodo: { connect: { id: toDoId } },
          goal: { connect: { id: goalId } },
          user: { connect: { id: user.id } },
        })
        .$fragment(POST_HISTORY_FRAGMENT);
      const date = new Date();
      try {
        if (postPrivate === true) {
          await prisma.updateGoal({
            where: { id: goalId },
            data: { postUploadDate: date },
          });
        }
      } catch (e) {
        console.log(e);
      }
      try {
        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            await prisma.createFile({
              url: files[i],
              postRatio: postRatio[i],
              post: { connect: { id: post.id } },
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
      return await prisma.dayToDo({ id: toDoId }).$fragment(DAYTODO_FRAGMENT);
    },
  },
};
