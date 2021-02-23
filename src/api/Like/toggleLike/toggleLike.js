import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { LIKE_FRAGMENT, POST_HISTORY_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { postId } = args;

      const post = await prisma
        .post({ id: postId })
        .$fragment(POST_HISTORY_FRAGMENT);

      const likes = post.likes;

      const existing = likes.map((obj) => obj.id).includes(user.id);
      console.log(existing);
      if (existing) {
        await prisma.updatePost({
          where: { id: postId },
          data: { likes: { disconnect: { id: user.id } } },
        });
      } else {
        await prisma
          .updatePost({
            where: { id: postId },
            data: { likes: { connect: { id: user.id } } },
          })
          .$fragment(LIKE_FRAGMENT);
      }
      return prisma.user({ id: user.id });
    },
  },
};
