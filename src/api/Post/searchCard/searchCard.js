import { prisma } from "../../../../generated/prisma-client";
import { FULL_CARD_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    searchCard: async (_, args, { request }) => {
      const { user } = request;
      const { term, tab, items, pageNumber, ordering } = args;
      try {
        if (tab === "전체") {
          return prisma
            .goals({
              where: {
                AND: [
                  {
                    goalText_contains: term,
                  },

                  { cardPrivate: true },
                ],
              },
              first: items,
              skip: pageNumber,
              orderBy:
                ordering === "업로드"
                  ? "postUploadDate_DESC"
                  : ordering === "추천"
                  ? "excellentCounts_DESC"
                  : ordering === "클로버"
                  ? "luckyCounts_DESC"
                  : ordering === "즐겨찾기"
                  ? "favoriteCounts_DESC"
                  : null,
            })
            .$fragment(FULL_CARD_FRAGMENT);
        } else if (tab === "소울링") {
          const souling = await prisma.user({ id: user.id }).following();
          return prisma
            .goals({
              where: {
                AND: [
                  {
                    user: { id_in: [...souling.map((user) => user.id)] },
                  },
                  {
                    goalText_contains: term,
                  },
                  { cardPrivate: true },
                ],
              },
              first: items,
              skip: pageNumber,
              orderBy:
                ordering === "업로드"
                  ? "postUploadDate_DESC"
                  : ordering === "추천"
                  ? "excellentCounts_DESC"
                  : ordering === "클로버"
                  ? "luckyCounts_DESC"
                  : ordering === "즐겨찾기"
                  ? "favoriteCounts_DESC"
                  : null,
            })
            .$fragment(FULL_CARD_FRAGMENT);
        } else if (tab === "완료") {
          return prisma
            .goals({
              where: {
                AND: [
                  { cardPrivate: true },
                  { complete: true },
                  {
                    goalText_contains: term,
                  },
                ],
              },
              first: items,
              skip: pageNumber,
              orderBy:
                ordering === "업로드"
                  ? "postUploadDate_DESC"
                  : ordering === "추천"
                  ? "excellentCounts_DESC"
                  : ordering === "클로버"
                  ? "luckyCounts_DESC"
                  : ordering === "즐겨찾기"
                  ? "favoriteCounts_DESC"
                  : null,
            })
            .$fragment(FULL_CARD_FRAGMENT);
        } else if (tab === "즐겨찾기") {
          return prisma
            .goals({
              where: {
                AND: [
                  { cardPrivate: true },
                  {
                    goalText_contains: term,
                  },
                  { favorites_some: { id: user.id } },
                ],
              },
              first: items,
              skip: pageNumber,
              orderBy:
                ordering === "업로드"
                  ? "postUploadDate_DESC"
                  : ordering === "추천"
                  ? "excellentCounts_DESC"
                  : ordering === "클로버"
                  ? "luckyCounts_DESC"
                  : ordering === "즐겨찾기"
                  ? "favoriteCounts_DESC"
                  : null,
            })
            .$fragment(FULL_CARD_FRAGMENT);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
