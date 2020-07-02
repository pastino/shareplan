import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { DAYTODO_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    editPost: async (_, args, { request }) => {
      isAuthenticated(request);
      const {
        id,
        caption,
        title,
        postPrivate,
        goalId,
        files,
        postRatio,
        toDoId,
      } = args;

      const { user } = request;
      const verify = await prisma.$exists.post({
        AND: [
          {
            user: { id: user.id },
          },
          { id },
        ],
      });
      if (verify) {
        const goalPosts = await prisma.posts({
          where: { goal: { id: goalId }, id_not: id, postPrivate: true },
        });
        const publicPostArray = goalPosts.map((post) => post.createdAt);
        const latestCreatedAt =
          publicPostArray.length === 0
            ? new Date(0, 0, 0)
            : publicPostArray &&
              publicPostArray.reduce(function(previous, current) {
                return previous > current ? previous : current;
              });

        const editPost = await prisma.post({ id });
        const editPostCreatedAt = editPost.createdAt;
        const editPostPublic = editPost.postPrivate;

        if (editPostPublic !== true && postPrivate === true) {
          if (latestCreatedAt < editPostCreatedAt) {
            await prisma.updateGoal({
              where: { id: goalId },
              data: { postUploadDate: editPostCreatedAt },
            });
          } else {
            null;
          }
        } else if (editPostPublic === true && postPrivate !== true) {
          if (latestCreatedAt < editPostCreatedAt) {
            await prisma.updateGoal({
              where: { id: goalId },
              data: { postUploadDate: latestCreatedAt },
            });
          } else {
            null;
          }
        }
        await prisma.updatePost({
          where: { id },
          data: { caption, title, postPrivate },
        });

        if (files !== [] && files !== null) {
          await prisma.deleteManyFiles({ post: { id } });
          for (let i = 0; i < files.length; i++) {
            await prisma.createFile({
              url: files[i],
              postRatio: postRatio[i],
              post: { connect: { id } },
            });
          }
        } else if (files === []) {
          await prisma.deleteManyFiles({ post: { id } });
        } else if (files === null) {
          null;
        }

        const dayToDo = await prisma
          .dayToDo({ id: toDoId })
          .$fragment(DAYTODO_FRAGMENT);

        return dayToDo;
      }
    },
  },
};
