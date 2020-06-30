import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { LIKE_FRAGMENT, POST_HISTORY_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { postId } = args;
      const fillterExitsting = {
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            post: {
              id: postId,
            },
          },
        ],
      };
      const existing = await prisma.$exists.like(fillterExitsting);
      const post = await prisma
        .post({ id: postId })
        .$fragment(POST_HISTORY_FRAGMENT);

      const likes = post.likes;

      if (existing) {
        const deleteId = likes.filter((like) => like.user.id === user.id)[0].id;
        return await prisma
          .deleteLike({ id: deleteId })
          .$fragment(LIKE_FRAGMENT);
      } else {
        return await prisma
          .createLike({
            user: {
              connect: {
                id: user.id,
              },
            },
            post: {
              connect: {
                id: postId,
              },
            },
          })
          .$fragment(LIKE_FRAGMENT);
      }
    },
  },
};
