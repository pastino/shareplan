import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";
import { FULL_CARD_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFeed: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const me = await prisma.user({ id: user.id });
      const myGoal = await prisma.goals({ where: { user: { id: user.id } } });
      const mydetailCategories = myGoal.map(goal => goal.detailCategory);
      const myBigCategories = myGoal.map(goal => goal.category);
      if (myBigCategories.length === 0) {
        return [];
      } else {
        const equalDetailGoals = await prisma
          .goals({
            where: {
              AND: [
                { user: { id_not: user.id } },
                { cardPrivate: true },
                {
                  OR: [
                    { category: myBigCategories[0] },
                    { category: myBigCategories[1] },
                    { category: myBigCategories[2] },
                    { category: myBigCategories[3] },
                    { category: myBigCategories[4] }
                  ]
                },
                {
                  OR: [
                    { detailCategory_contains: mydetailCategories[0] },
                    { detailCategory_contains: mydetailCategories[1] },
                    { detailCategory_contains: mydetailCategories[2] },
                    { detailCategory_contains: mydetailCategories[3] },
                    { detailCategory_contains: mydetailCategories[4] }
                  ]
                }
              ]
            },
            orderBy: "excellentCounts_DESC"
          })
          .$fragment(FULL_CARD_FRAGMENT);

        const array = equalDetailGoals.slice(0, 50);

        var length = array.length;
        while (length) {
          var index = Math.floor(length-- * Math.random());
          var temp = array[length];
          array[length] = array[index];
          array[index] = temp;
        }

        const finallyGoals = array.slice(0, 10);

        if (equalDetailGoals.length <= 10) {
          return equalDetailGoals;
        } else {
          return finallyGoals;
        }
      }
    }
  }
};
