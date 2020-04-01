import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { LIKE_FRAGMENT } from "../../../fragments";

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
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };
      const existing = await prisma.$exists.like(fillterExitsting);
      try {
        if (existing) {
          await prisma.deleteManyLikes(fillterExitsting);
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
