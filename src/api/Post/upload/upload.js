import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (_, args, { request }) => {
      isAuthenticated(request);
      const {
        caption,
        files,
        title,
        assortment,
        goalInformationId,
        postPrivate,
        goalId
      } = args;
      const { user } = request;
      const post = await prisma.createPost({
        goalInformation: { connect: { id: goalInformationId } },
        title,
        assortment,
        caption,
        postPrivate,
        goal: { connect: { id: goalId } },
        user: { connect: { id: user.id } }
      });
      const date = new Date();
      try {
        if (postPrivate === true) {
          await prisma.updateGoal({
            where: { id: goalId },
            data: { postUploadDate: date }
          });
        }
      } catch (e) {
        console.log(e);
      }
      try {
        if (files && files.length > 0) {
          files.forEach(async file => {
            await prisma.createFile({
              url: file,
              post: { connect: { id: post.id } }
            });
          });
        }
      } catch (e) {
        console.log(e);
      }

      return post;
    }
  }
};
