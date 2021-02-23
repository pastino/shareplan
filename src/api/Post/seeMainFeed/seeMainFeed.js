import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { FULL_CARD_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeMainFeed: async (_, args, { request }) => {
      isAuthenticated(request);
      const { pageNumber, items, filtering, ordering } = args;
      const { user } = request;

      try {
        if (filtering === "전체") {
          return prisma
            .goals({
              where: {
                AND: [{ cardPrivate: true }],
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
        } else if (filtering === "소울링") {
          const souling = await prisma.user({ id: user.id }).following();
          return prisma
            .goals({
              where: {
                AND: [
                  {
                    user: {
                      id_in: [...souling.map((user) => user.id)],
                      id_not: user.id,
                    },
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
        } else if (filtering === "완료") {
          return prisma
            .goals({
              where: {
                AND: [
                  { user: { id_not: user.id } },
                  { cardPrivate: true },
                  { complete: true },
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
        } else if (filtering === "즐겨찾기") {
          return prisma
            .goals({
              where: {
                AND: [
                  { user: { id_not: user.id } },
                  { cardPrivate: true },
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
