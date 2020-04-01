import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    isFollowing: (parent, _, { request }) => {
      const { id } = parent;
      const { user } = request;
      return prisma.$exists.user({
        AND: [
          { id: user.id },
          {
            following_some: { id }
          }
        ]
      });
    },
    isSelf: (parent, _, { request }) => {
      const { id } = parent;
      const { user } = request;
      return id === user.id;
    },
    postCounts: parent => {
      const { id } = parent;
      return prisma
        .postsConnection({
          where: {
            AND: [
              { user: { id } },
              { goal: { cardPrivate: true } },
              { postPrivate: true }
            ]
          }
        })
        .aggregate()
        .count();
    },
    goalCounts: parent => {
      const { id } = parent;
      return prisma
        .goalsConnection({
          where: { AND: [{ user: { id } }, { cardPrivate: true }] }
        })
        .aggregate()
        .count();
    }
  },
  Goal: {
    excellentCounts: parent => {
      const { id } = parent;
      return prisma
        .usersConnection({
          where: { excellents_some: { id } }
        })
        .aggregate()
        .count();
    }
  },
  Post: {
    isLiked: (parent, _, { request }) => {
      const { id } = parent;
      const { user } = request;
      return prisma.$exists.like({
        AND: [
          { user: { id: user.id } },
          {
            post: { id }
          }
        ]
      });
    },
    likeCount: parent => {
      const { id } = parent;
      return prisma
        .likesConnection({ where: { post: { id } } })
        .aggregate()
        .count();
    },
    commentCounts: parent => {
      const { id } = parent;
      return prisma
        .commentsConnection({ where: { post: { id } } })
        .aggregate()
        .count();
    },
    repplyCounts: parent => {
      const { id } = parent;
      return prisma
        .reppliesConnection({ where: { post: { id } } })
        .aggregate()
        .count();
    }
  },
  Talk: {
    talkCommentCounts: parent => {
      const { id } = parent;
      return prisma
        .talkCommentsConnection({ where: { talk: { id } } })
        .aggregate()
        .count();
    },
    talkRepplyCounts: parent => {
      const { id } = parent;
      return prisma
        .talkReppliesConnection({ where: { talk: { id } } })
        .aggregate()
        .count();
    }
  }
};
