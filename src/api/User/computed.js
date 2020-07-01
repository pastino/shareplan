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
            following_some: { id },
          },
        ],
      });
    },
    isSelf: (parent, _, { request }) => {
      const { id } = parent;
      const { user } = request;
      return id === user.id;
    },
    postCounts: (parent) => {
      const { id } = parent;
      return prisma
        .postsConnection({
          where: {
            AND: [
              { user: { id } },
              { goal: { cardPrivate: true } },
              { postPrivate: true },
            ],
          },
        })
        .aggregate()
        .count();
    },
    goalCounts: (parent) => {
      const { id } = parent;
      return prisma
        .goalsConnection({
          where: { AND: [{ user: { id } }, { cardPrivate: true }] },
        })
        .aggregate()
        .count();
    },
  },
  Goal: {
    excellentCounts: (parent) => {
      const { id } = parent;
      return prisma
        .usersConnection({
          where: { excellents_some: { id } },
        })
        .aggregate()
        .count();
    },
    goalCommentsCount: (parent) => {
      const { id } = parent;
      return prisma
        .goalCommentsConnection({ where: { goal: { id } } })
        .aggregate()
        .count();
    },
    goalReppliesCount: (parent) => {
      const { id } = parent;
      return prisma
        .goalReppliesConnection({ where: { goal: { id } } })
        .aggregate()
        .count();
    },
    dayToDoesCount: (parent) => {
      const { id } = parent;
      return prisma
        .dayToDoesConnection({ where: { goal: { id } } })
        .aggregate()
        .count();
    },
    dayToDoComCount: (parent) => {
      const { id } = parent;
      return prisma
        .dayToDoesConnection({
          where: { AND: [{ goal: { id } }, { complete: true }] },
        })
        .aggregate()
        .count();
    },
    historyCount: (parent) => {
      const { id } = parent;
      return prisma
        .postsConnection({
          where: { AND: [{ goal: { id } }] },
        })
        .aggregate()
        .count();
    },
    historyPubCount: (parent) => {
      const { id } = parent;
      return prisma
        .postsConnection({
          where: { AND: [{ goal: { id } }, { postPrivate: true }] },
        })
        .aggregate()
        .count();
    },
  },
  Post: {
    likeCount: (parent, _, { request }) => {
      const { id } = parent;
      const { user } = request;
      return prisma
        .usersConnection({ where: { id: user.id } })
        .aggregate()
        .count();
    },
    commentCounts: (parent) => {
      const { id } = parent;
      return prisma
        .commentsConnection({ where: { post: { id } } })
        .aggregate()
        .count();
    },
    repplyCounts: (parent) => {
      const { id } = parent;
      return prisma
        .reppliesConnection({ where: { post: { id } } })
        .aggregate()
        .count();
    },
  },
  Talk: {
    talkCommentCounts: (parent) => {
      const { id } = parent;
      return prisma
        .talkCommentsConnection({ where: { talk: { id } } })
        .aggregate()
        .count();
    },
    talkRepplyCounts: (parent) => {
      const { id } = parent;
      return prisma
        .talkReppliesConnection({ where: { talk: { id } } })
        .aggregate()
        .count();
    },
  },
};
